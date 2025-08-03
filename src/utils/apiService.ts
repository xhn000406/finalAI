import axiosInstance from "./axiosInstance";
import type { AxiosRequestConfig } from "axios";
import { useCallback } from "react";

// 错误处理函数
const handleError = (error: any): Error => {
  let errorMessage = "请求失败";

  if (error.response) {
    // 服务器返回错误
    errorMessage = `请求失败: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    // 请求已发送但未收到响应
    errorMessage = "网络错误: 请检查您的网络连接";
  } else {
    // 设置请求时发生错误
    errorMessage = `请求错误: ${error.message}`;
  }

  return new Error(errorMessage);
};

// GET 请求
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data; // 直接返回数据部分
  } catch (error) {
    throw handleError(error);
  }
};

// POST 请求
export const apiPost = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT 请求
export const apiPut = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE 请求
export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// 自定义 Hook 版本（如果需要在组件中使用，带有记忆化处理）
export const useApi = () => {
  // 使用 useCallback 记忆化函数，避免在组件重渲染时创建新函数
  const get = useCallback(async <T>(url: string, config?: AxiosRequestConfig) => {
    return apiGet<T>(url, config);
  }, []);

  const post = useCallback(async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiPost<T>(url, data, config);
  }, []);

  const put = useCallback(async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiPut<T>(url, data, config);
  }, []);

  const del = useCallback(async <T>(url: string, config?: AxiosRequestConfig) => {
    return apiDelete<T>(url, config);
  }, []);

  return {
    get,
    post,
    put,
    delete: del, // 使用 del 避免与关键字冲突
  };
};

// 默认导出工具函数集合
export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};
