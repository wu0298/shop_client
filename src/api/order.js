import axios from './index';

/**
 * 获取支付链接
 */
export function getUrl(data) {
  return axios.request({
    url: '/payment',
    method: 'post',
    data,
  });
}

/**
 * 获取对应的订单
 */
export function GetOrder() {
  return axios.request({
    url: '/order/user',
    method: 'get',
  });
}

export function editOrderStatu(orderId, status){
  return axios.request({
    url: `order/${orderId}/${status}`,
    method:'put'
  })
}