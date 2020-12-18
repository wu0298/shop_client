import axios from "./index";

/**
 * 获取推荐商品
 */
export function getRand(data) {
  return axios.request({
    url: "/goods/rand",
    method: "get",
    data,
  });
}

export function getZS(data) {
  return axios.request({
    url: "/goods/"+data,
    method: "get",
  });
}
