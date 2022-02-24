import axios from "axios";
import qs from "qs";


const _axios = axios.create({
  timeout: 30 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  paramsSerializer: (param) => qs.stringify(param)
});

_axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    return config;
  },
  function (error) {
    // Do something with request error
    console.error(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;
