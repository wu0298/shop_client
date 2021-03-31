import axios from "./index";

/**
 * 注册
 */
export function Register(data) {
  return axios.request({
    url: "/admin",
    method: "put",
    data,
  });
}
