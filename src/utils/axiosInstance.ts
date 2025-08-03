import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api', // 基础 URL
  timeout: 35000, // 超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 修复核心：确保返回 config
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => { // 这里建议使用正确的类型，而非 any
    // 可以添加认证 token 等信息
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 必须返回配置对象，否则会导致后续错误
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器 - 建议也返回数据，否则可能导致后续无法获取响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理成功响应，通常返回数据部分
    return response.data; // 取消注释，确保返回响应数据
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('未授权访问，请登录');
          // 可以添加重定向逻辑
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error(`请求错误: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error('没有收到响应，请检查网络连接');
    } else {
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
