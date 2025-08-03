import { apiGet } from "@/utils/apiService";

// 用户相关 API

  // 获取用户信息
  
export  async function getUserInfo(userId: string) {
    return apiGet(`/users/${userId}`);
  }
