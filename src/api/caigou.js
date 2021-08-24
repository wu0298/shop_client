import axios from "./index";

export function getCgInfo(id){
  return axios.request({
    url: `/cg/${id}`,
    method:'get'
  })
}

export function getCg(current,pages){
  return axios.request({
    url: `/cg/list/${current}/${pages}`,
    method:'get'
  })
}

export function addCg(data){
  return axios.request({
    url: `/cg`,
    method:'post',
    data
  })
}

export function changeStatus(id){
  return axios.request({
    url: `/cg/${id}`,
    method:'delete'
  })
}

export function delCg(id){
  return axios.request({
    url: `/cg/delete/${id}`,
    method:'delete'
  })
}

export function updateCg(data){
  return axios.request({
    url: `/cg`,
    method:'put',
    data
  })
}