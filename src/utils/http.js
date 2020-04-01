import Vue from 'vue'
import axios from 'axios'
// Vue.use(axios);
import { baseUrl } from './baseUrl'
axios.defaults.baseURL = baseUrl

Vue.prototype.$axios = axios

// 设置路由拦截器

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // console.log(config)
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default axios