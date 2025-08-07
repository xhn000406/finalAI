import { Space } from 'antd';
import {
  AddFileIcon,
  ChatMessageIcon,
  EditerIcon,
  InferenceIcon,
  InternetIcon,
  SliderBarIcon,
  ThemeIcon,
} from '../../components/svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { sendChatMessageApi } from '@/api/chatApi';
import Item from 'antd/es/list/Item';

interface ChatMessageProps {
  handleIsShowSlider: (value: boolean) => void;
  isShowSliderValue: boolean;
}

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

export default function ChatMessage({
  handleIsShowSlider,
  isShowSliderValue,
}: ChatMessageProps) {
  const [messages, setMessages] = useState([]);
  const [inputMessageValue, setInputMessageValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamId, setCurrentStreamId] = useState(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  const handleIsShowSliderValue = () => {
    handleIsShowSlider(!isShowSliderValue);
  };
  const handleStreamMessage = useCallback(() => {
    // 校验输入和状态
    if (!inputMessageValue.trim() || isStreaming) return;

    // 1. 关闭现有流（关键：解除注释）
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // 2. 添加用户消息
    const userMessage: Message = {
      id: Date.now(),
      content: inputMessageValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessageValue('');
    setIsStreaming(true);

    // 3. 创建当前流ID
    const streamId = Date.now();
    setCurrentStreamId(streamId);

    // 4. 创建AI消息骨架（关键：初始化AI消息，用于后续拼接）
    const aiMessageId = Date.now() + 1; // 确保ID唯一
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        content: '', // 初始为空
        sender: 'ai',
        timestamp: new Date(),
        isStreaming: true, // 标记为流式中
      },
    ]);

    // 5. 构建查询参数
    const params = new URLSearchParams();
    params.append('message', inputMessageValue);

    // 6. 建立SSE连接
    try {
      eventSourceRef.current = new EventSource(
        `api/chat/stream?${params.toString()}`,
      );
    } catch (error) {
      console.error('创建SSE连接失败:', error);
      setIsStreaming(false);
      return;
    }

    // 7. 处理流式消息（适配后端{msg: "内容"}格式）
    eventSourceRef.current.onmessage = (event) => {
      // 只处理当前流的消息
      // if (currentStreamId !== streamId) return;

      try {
        const sseContent = event.data.replace(/^data: /, '');
        // 2. 解析处理后的JSON字符串
        const data = JSON.parse(sseContent);
        console.log(data)
        const chunk = data.msg || ''; // 后端返回的是{msg: "..."}

        if (chunk) {
          setMessages((prev) =>
            prev.map((msg) => {
              // 找到当前AI消息，拼接内容
              if (msg.id === aiMessageId) {
                return { ...msg, content: msg.content + chunk };
              }
              return msg;
            }),
          );
        }
      } catch (err) {
        console.error('解析流数据错误:', err);
      }
    };

    // 8. 处理流关闭（后端结束时触发）
    eventSourceRef.current.onclose = () => {
      console.log('流正常结束');
      // 更新AI消息状态为"已完成"
      eventSourceRef.current?.close();

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === aiMessageId) {
            return { ...msg, isStreaming: false };
          }
          return msg;
        }),
      );
      setIsStreaming(false); // 重置流式状态
    };

    // 9. 处理连接错误
    eventSourceRef.current.onerror = (error) => {
      
      console.error('流连接错误:', error);
      eventSourceRef.current?.close();
      // 错误时强制标记AI消息为"已完成"
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === aiMessageId) {
            return { ...msg, isStreaming: false };
          }
          return msg;
        }),
      );
      console.log(messages);
      setIsStreaming(false);
    };
  }, [inputMessageValue, isStreaming, currentStreamId]); // 完整依赖

  const sendChatMessage = () => {
    handleStreamMessage();
  };

  // 处理流式消息发送

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {/* 头部 */}
      <div className="flex h-16 justify-between">
        {/* 头部左侧 */}
        <div className="flex h-full w-4/5 items-center">
          {/* 折叠icon */}
          <button
            type="button"
            className="ml-4"
            style={{ marginLeft: '1rem' }}
            onClick={handleIsShowSliderValue}
            aria-label="切换滑块值显示" // 增加屏幕阅读器说明
          >
            <div
              className="flex h-3/5 w-[6rem] items-center"
              style={{ marginLeft: '1rem' }}
            >
              <div>🟢 默认</div>
              <div style={{ marginLeft: '0.3rem' }}>
                <Space>
                  <SliderBarIcon />
                </Space>
              </div>
            </div>
          </button>
          {/* 模型选择 */}
        </div>
        {/* 头部右侧 */}
        <div className="flex h-full w-1/5 items-center">
          {/* 模式切换 */}
          <div style={{ marginRight: '1rem' }}>
            <Space>
              <ThemeIcon></ThemeIcon>
            </Space>
          </div>
          {/* 编辑 */}
          <div>
            <Space>
              <EditerIcon></EditerIcon>
            </Space>
          </div>
        </div>
      </div>

      {/* main */}
      {!messages.length && (
        <div className="flex-1 overflow-auto pb-32">
          <div className="flex min-h-full flex-col items-center justify-center">
            <div className="text-[rgb(99_102_241_/_1)] text-3xl font-bold">
              FinalAI 助手
            </div>
            {/* 方块盒子 */}
            <div className="mt-10 w-9/10" style={{ marginTop: '2rem' }}>
              <div className="w-full md:max-w-[40rem]">
                <div className=" grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex h-20 items-center justify-center space-y-4 rounded-xl border-1 border-[#e3e3e3]">
                    <div className="flex h-[70%] w-4/5 flex-col justify-between">
                      <div>
                        <Space>
                          <InternetIcon></InternetIcon>
                        </Space>
                      </div>
                      <div className=" text-gray-600">文化多样性保护</div>
                    </div>
                  </div>
                  <div className="flex h-20 items-center justify-center space-y-4 rounded-xl border-1 border-[#e3e3e3]">
                    <div className="flex h-[70%] w-4/5 flex-col justify-between">
                      <div>
                        <Space>
                          <InternetIcon></InternetIcon>
                        </Space>
                      </div>
                      <div className=" text-gray-600">文化多样性保护</div>
                    </div>
                  </div>
                  <div className="flex h-20 items-center justify-center space-y-4 rounded-xl border-1 border-[#e3e3e3]">
                    <div className="flex h-[70%] w-4/5 flex-col justify-between">
                      <div>
                        <Space>
                          <InternetIcon></InternetIcon>
                        </Space>
                      </div>
                      <div className=" text-gray-600">文化多样性保护</div>
                    </div>
                  </div>
                  <div className="flex h-20 items-center justify-center space-y-4 rounded-xl border-1 border-[#e3e3e3]">
                    <div className="flex h-[70%] w-4/5 flex-col justify-between">
                      <div>
                        <Space>
                          <InternetIcon></InternetIcon>
                        </Space>
                      </div>
                      <div className=" text-gray-600">文化多样性保护</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 这里可以添加更多内容，会自动滚动 */}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex-1 overflow-auto pb-32">
          {messages.map((item: Message) => {
            return <div key={item.id}>{item.content}</div>;
          })}
        </div>
      )}

      {/* 底部 */}
      <div className="h-80">
        <div className="absolute right-0 bottom-3 left-0 flex items-center justify-center">
          <div className="mx-auto h-30 w-11/12 shrink-0 rounded-lg border-1 border-[rgb(99_102_241_/_1)] sm:w-1/2">
            <div className="flex h-3/5 pl-4">
              <textarea
                placeholder="向 FinalAI 助手 发消息，使用 @ 搜索应用"
                className=" max-h-[30vh] min-h-16 w-14/15 border-none pt-2 shadow-none outline-none"
                value={inputMessageValue}
                onKeyDown={(e) => {
                  // 仅在按下 Enter 且未按住 Shift 时发送消息（避免 Shift+Enter 换行被拦截）
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // 阻止默认换行行为
                    sendChatMessage();
                  }
                  // 确保不处理空格键，保持默认行为（插入空格）
                }}
                onChange={(e) => setInputMessageValue(e.target.value)}
              ></textarea>
            </div>
            <div className="flex h-2/5 justify-center">
              <div className="flex w-14/15 justify-between">
                <div className=" flex w-full items-center">
                  {/* <img src="@/images/添加.png" alt="" /> */}
                  <div>
                    <Space>
                      <AddFileIcon></AddFileIcon>
                    </Space>
                  </div>
                  <div className="ml-6 flex h-8 w-16 items-center justify-center rounded-full border-2 border-blue-500">
                    <div>
                      <Space>
                        <InferenceIcon></InferenceIcon>
                      </Space>
                    </div>
                    <div className="ml-0.5 text-sm">推理</div>
                  </div>
                  <div className="ml-6 h-8 w-16 rounded-full border-2 border-blue-500">
                    1111
                  </div>
                  <div className="ml-6 h-8 w-16 rounded-full border-2 border-blue-500">
                    1111
                  </div>
                </div>
                {/* 沟通逻辑 */}
                <button
                  type="button"
                  onClick={sendChatMessage}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendChatMessage();
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500"
                >
                  <div>
                    <Space>
                      <ChatMessageIcon></ChatMessageIcon>
                    </Space>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
