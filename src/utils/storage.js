import { TOKEN, USER, CART } from "./constant";

/* 设置键值 */
export function setUser(data) {
  localStorage.setItem(USER, JSON.stringify(data));
}
export function setToken(data) {
  localStorage.setItem(TOKEN, data);
}
export function setCart(data) {
  localStorage.setItem(CART, data);
}

/* 获取键值 */
export function getUser() {
  return JSON.parse(localStorage.getItem(USER));
}
export function getToken() {
  return localStorage.getItem(TOKEN);
}
export function getCart() {
  if(!localStorage.getItem(CART)) return null
  return JSON.parse(localStorage.getItem(CART));
}

/* 删除键值 */
export function remove() {
  localStorage.removeItem(USER);
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(CART);
}
