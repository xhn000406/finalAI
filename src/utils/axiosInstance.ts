import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse }  from 'axios'
// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // 从环境变量获取基础 URL
  timeout: 5000, // 超时时间设置为 5 秒
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config:any) => {
    // 在这里可以添加认证 token 等信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理成功响应
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          // 未授权，可能需要重定向到登录页
          console.error('未授权访问，请登录');
          // 可以在这里添加重定向逻辑
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
      // 请求已发送但未收到响应
      console.error('没有收到响应，请检查网络连接');
    } else {
      // 设置请求时发生错误
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;