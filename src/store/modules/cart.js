import { GetCart, SetCart, changeChecked } from '@/api/cart';
import { setCart, getCart } from '@/utils/storage';

export default {
  namespaced: true,
  state: {
    // 购物车
    cart: getCart() || [],
  },
  getters: {
    // 获取购物车长度
    cartLength(state) {
      const arr = Object.entries(state.cart.cartMap)
      return arr.reduce((pre, cur) => {
        if (cur[1].product) {
          pre += cur[1].count;
        }
        console.log(pre);
        return pre;
      }, 0);
    },
    // 获取购物车
    cartList(state) {
      return state.cart.cartMap;
    },
  },
  mutations: {
    // 添加购物车
    ADD_TO_CART(state, data) {
      state.cart.push(data);
    },
    // 生成用户购物车
    SET_CART(state, data) {
      state.cart = data;
    },
    // 设置购物车
    SET_GOOD(state, { data, type }) {
      state.cart.map((item) => {
        if (item._id === data._id) item[type] = data[type];
      });
    },
  },
  actions: {
    // 添加购物车
    addCart({ commit, state }, paylod) {
      /* 
        判断是否存在 存在则数量 +1，不存在则添加购物车
      */
      return new Promise((resolvt, reject) => {
        // 查询是否有相同的商品
        let oldProduct = state.cart.find((item) => item._id === paylod._id);

        // 如果有则数量 + 1
        if (oldProduct) {
          oldProduct.num += 1;
          commit('SET_GOOD', {
            data: oldProduct,
            type: 'num',
          });
          resolvt('添加成功 +1');
        } else {
          // 没有则直接添加
          paylod.num = 1;
          paylod.checked = true;
          commit('ADD_TO_CART', paylod);
          resolvt('添加成功');
        }

        // 服务端设置购物车
        setUserCart(state.cart);
      });
    },
    // 请求获取购物车
    getCart({ commit }) {
      setTimeout(async () => {
        //相当于 const res = await GetCart().data;
        const { data: res } = await GetCart();

        setCart(JSON.stringify(res)); // 前端本地存储购物车
        commit('SET_CART', res); // 设置 vuex 购物车
      }, 0);
    },
    // 删除指定商品
    clearGood({ state }, paylod) {
      /* 获取索引 */
      const index = state.cart.findIndex((item) => item._id === paylod);
      state.cart.splice(index, 1);

      // 服务端设置购物车
      setUserCart(state.cart);
    },

    // 修改商品数量
    setGood({ commit, }, paylod) {
      // 服务端设置购物车
      setUserCart(commit, paylod);
    },
    //改变商品选中状态
    changeGood({commit}, paylod){
      getChecked(commit, paylod)
    },

    // 批量设置商品购物车
    setGoodCart({ commit, state }, paylod) {
      commit('SET_CART', paylod);

      // 服务端设置购物车
      setUserCart(state.cart);
    },
  },
};

// 设置购物车
function setUserCart(commit,payload) {
  // 后端设置购物车
  const data = new URLSearchParams()
  data.set("goodId", payload.goodId)
  data.set("count", payload.count)
  SetCart(data).then((res) => {
    if (res.code === 200) {
      setCart(JSON.stringify(res.data)); // 前端本地存储购物车
      commit('SET_CART', res.data)
    }
  });
}

function getChecked(commit,paylod){
  const data = new URLSearchParams()
  data.set("goodId", paylod.id)
  changeChecked(data).then( res => {
    if (res.code === 200) {
      setCart(JSON.stringify(res.data)); // 前端本地存储购物车
      commit('SET_CART', res.data)
    }
  })
}