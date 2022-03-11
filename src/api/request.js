import axios from 'axios';
import Auth from './auth';
import router from '@router';

/** base */
const base = 'http://cicd.blockchain.lenovo.com/screen/v1/';

/** 超时设定 */
// axios.defaults.timeout = 15000;

/** 请求拦截 */
axios.interceptors.request.use(
  (config) => {
    config = [{ Accept: 'application/json' }, { Authorization: `bearer ${Auth.getToken()}` }];
    return config;
  },
  (err) => {
    alert('请求超时');
    return Promise.reject(err);
  },
);

/** 响应拦截 */
axios.interceptors.response.use(
  (response) => {
    const data = response.data;

    // TODO: 根据返回的code值来做不同的处理(需和后端约定)
    switch (data.code) {
      case 401:
        // TODO: 未登录时 清除已登录状态(cookie & store)
        Auth.deauthenticateUser();
        if (router.history.current.name !== 'login') {
          if (data.msg !== null) {
            alert(data.msg);
          } else {
            alert('未知错误，请重新登录');
          }
          router.push('/login');
        }
        break;
      case 403:
        // 没有权限
        if (data.msg !== null) {
          alert(data.msg);
        } else {
          alert('未知错误');
        }
        break;
      case 500:
        // 错误
        if (data.msg !== null) {
          alert(data.msg);
        } else {
          alert('未知错误');
        }
        break;
      default:
        return data;
    }

    return data;
  },
  (err) => {
    // 返回状态码不为200时候的错误处理
    alert(err.toString());
    return Promise.resolve(err);
  },
);

export const api = axios.create({
  baseUrl: base,
  headers: {
    Accept: 'application/json',
    Authorization: `bearer ${Auth.getToken()}`,
  },
});

/**
 * post
 * @param {*} uri
 * @param {*} payload
 * @returns
 */
export const post = (uri, payload) => {
  return api.post(`${base}${uri}`, payload);
};

/**
 * get
 * @param {*} uri
 * @param {*} params
 * @returns
 */
export const get = (uri, params) => {
  return api.get(`${base}${uri}`, params);
};

/**
 * delete
 * @param {*} uri
 * @param {*} params
 * @returns
 */
export const deleteRequest = (uri, params) => {
  return api.delete(`${base}${uri}`, params);
};
