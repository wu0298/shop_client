import axios from "axios";
import { baseURL } from "@/config";
import { Message } from "element-ui";
import { getToken } from "@/utils/storage";

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: 'Bearer ' + getToken()|| ''
      },
    };
    return config;
  }

  interceptors(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading...
        // if (!Object.keys(this.queue).length) {
        // Spin.show() 如果存在请求则等待 loading...
        // }
        config.headers.htoken = localStorage.getItem('htoken');
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        const { data } = res;
        return data;
      },
      (error) => {
        Message.error(error.response.data.message);
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

export default HttpRequest;
