/**
 * 过滤特殊字符
 */
export function stripScript(str) {
  let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  return !reg.test(str) ? true : false;
}
/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证手机号码
 */
export function validatePhone(value) {
  let reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return !reg.test(value) ? true : false;
}
/**
 * 验证验证码
 */
export function validateVCode(value) {
  let reg = /^[a-z0-9]{4}$/;
  return !reg.test(value) ? true : false;
}