import axios from "./index";

export function addTs(data){
  return axios.request({
    url: `/ts/add`,
    method:'post',
    data
  })
}
