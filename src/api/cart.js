import axios from "./index";

/**
 * 获取购物车
 */
export function GetCart(data) {
  return axios.request({
    url: '/cart/select',
    method: "get"
  });
}

/**
 * 添加进购物车
 */
export function apiAddCart(data) {
  return axios.request({
    url: '/cart/add',
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data
  });
}

/**
 * 设置购物车
 */
export function SetCart(data) {
  return axios.request({
    url: '/cart/edit',
    method: "put",
    data
  });
}

/**
 * 设置购物车
 */
export function changeChecked(data) {
  return axios.request({
    url: '/cart/checked',
    method: "put",
    data
  });
}