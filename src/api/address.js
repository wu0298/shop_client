import axios from './index';

/**
 * 获取所有用户相关的地址
 */
export function GetAllAddress() {
  return axios.request({
    url: '/address/select',
    method: 'get',
  });
}

/**
 * 获取指定的地址
 */
export function GetAddress({ id }) {
  return axios.request({
    url: `/address/${id}`,
    method: 'get',
  });
}

/**
 * 修改地址
 */
export function EditAddress({ data }) {
  return axios.request({
    url: `/address`,
    method: 'put',
    data,
  });
}

/**
 * 创建地址
 */
export function CreateAddress(data) {
  return axios.request({
    url: '/address/create',
    method: 'post',
    data,
  });
}

/**
 * 删除地址
 */
export function DelAddress({ id }) {
  return axios.request({
    url: `/address/${id}`,
    method: 'delete',
  });
}

/**
 * 获取默认地址
 */
export function GetDefaultAddress() {
  return axios.request({
    url: `/address/info`,
    method: 'get',
  });
}
