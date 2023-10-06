import axios from 'axios';
import storage from './storage';

const checkAuthURL = url => (
  /^\/user(\/(((favorites|houses)(\/[\w|-]+)?)|logout))?$/.test(url)
);

class Http {
  constructor(baseURL) {
    this.request = axios.create({ baseURL });
    this.request.interceptors.request.use(config => {
      const token = storage.getData('token');
      if (token && checkAuthURL(config.url)) {
        config.headers.authorization = token;
      }
      return config;
    }, error => Promise.reject(error));
  }

  /**
   * 集中处理请求的响应
   * @param {Promise} request axios 返回的 Promise 请求对象
   */
  handleRequest(request) {
    return request.then(response => [null, response]).catch(error => [error]);
  }

  /**
   * GET 请求
   * @param {string} url 请求 url
   * @param {Object} [params] 参数对象
   * @returns {Promise}
   */
  get(url, params) {
    return this.handleRequest(this.request.get(url, {
      params
    }));
  }

  /**
   * POST 请求
   * @param {string} url 请求 url
   * @param {Object} [data] 参数对象
   * @returns {Promise}
   */
  post(url, data) {
    return this.handleRequest(this.request.post(url, data));
  }

  /**
   * DELETE 请求
   * @param {string} url
   */
  delete(url) {
    return this.handleRequest(this.request.delete(url));
  }
}

const http = new Http(process.env.REACT_APP_URL);

export default http;
