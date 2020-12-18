import axios from "./index";

/**
 * 登录
 */
export function Login(data) {
  return axios.request({
    url: "/user/login",
    method: "post",
    data,
  });
}

/**
 * 手机验证码登录
 */
export function PhoneLogin(data) {
  return axios.request({
    url: "/auth/phoneLogin",
    method: "post",
    data,
  });
}

/**
 * 注册
 */
export function Register(data) {
  return axios.request({
    url: "/user/register",
    method: "post",
    data,
  });
}

export function Verify(data){
  return axios.request({
    url: "/verify/code",
    method: "post",
    data
  })
}

/**
 * 验证码
 */
export function GetSms(data) {
  return axios.request({
    url: "/email/getCode",
    method: "post",
    data,
  });
}

/**
 * 短信
 */
export function PhoneCode(data) {
  return axios.request({
    url: "/auth/phoneCode",
    method: "post",
    data,
  });
}

// /**
//  * 修改邮箱/手机
//  */
// export function EditAccount(data) {
//   return axios.request({
//     url: '/auth/account',
//     method: 'put',
//     data
//   })
// }

/**
 * 修改用户信息
 */
export function EditAccount(data) {
  return axios.request({
    url: '/auth',
    method: 'put',
    data
  })
} 

/**
 * 修改用户信息
 */
export function EditUser(data) {
  return axios.request({
    url: '/auth/info',
    method: 'put',
    data
  })
} 
/**
 * 无账号修改密码
 */
export function EditPassword(data) {
  return axios.request({
    url: '/auth/pwd',
    method: 'put',
    data
  })

}


/**
 * 头像
 */
export function Upload(data) {
  return axios.request({
    url: "/upload",
    method: "post",
    data,
  });
}
