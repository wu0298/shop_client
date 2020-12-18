import { Login, PhoneLogin } from "@/api/user";
import { getUser, getToken, setToken, setUser, remove } from "@/utils/storage";

export default {
  namespaced: true,
  state: {
    user: getUser() || null,
    token: getToken() || null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    /* 设置用户 */
    SET_USER(state, data) {
      state.user = data;
      /* 设置本地存储 */
      data && setUser(data);
    },
    /* 设置 token */
    SET_TOKEN(state, data) {
      state.token = data;
      /* 设置本地存储 */
      data && setToken(data);
    },
  },
  actions: {
    /* 登录并设置vuex状态state */
    set_user({ commit }, { data }) {
      return new Promise(async (resolve, reject) => {
        try {
          //判断mode类型，是常规登录还是email或phone
          // const res = await (mode === "login" ? Login(data) : PhoneLogin(data));
          //调用接口，获取登录后的数据
          const res = await Login(data)

          if (res.code !== 200) return reject({ status: false });
          const { token, user } = res.data;

          /* 设置 vuex 的 token 和 user */
          commit("SET_TOKEN", token);
          commit("SET_USER", user);

          resolve({ status: true });
        } catch (err) {
          reject({ status: false });
        }
      });
    },
    /* 退出 */
    remove_user({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          /* 清除 sessionStorage的数据 */
          remove()

          /* 设置 vuex 的 token 和 user 为空 */
          commit("SET_TOKEN", null);
          commit("SET_USER", null);

          resolve({ status: true });
        } catch (err) {
          reject({ status: false });
        }
      });
    },
  },
};
