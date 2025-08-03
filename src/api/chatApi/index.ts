import { apiPost } from "@/utils/apiService";

interface ChatMessageRequest {
  message: string;
}
  
export async function sendChatMessageApi(requestBody:ChatMessageRequest) {
    return apiPost(`/chat/message`,requestBody);
  }
