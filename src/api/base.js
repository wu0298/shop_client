import axios from "./index";
/**
 * 获取 分类组件 数据
 */
export function getCategory({ url, data }) {
  return axios.request({
    url,
    method: "get",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
}

export function getDetail(id) {
  return axios.request({
    url: "/goods/detail/"+id,
    method: "get",
  });
}