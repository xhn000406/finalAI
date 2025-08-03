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

interface ChatMessageProps {
  handleIsShowSlider: (value: boolean) => void;
  isShowSliderValue: boolean;
}

export default function ChatMessage({
  handleIsShowSlider,
  isShowSliderValue,
}: ChatMessageProps) {
  const handleIsShowSliderValue = () => {
    handleIsShowSlider(!isShowSliderValue);
  };

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

      {/* 底部 */}
      <div className="h-80">
        <div className="absolute right-0 bottom-3 left-0 flex items-center justify-center">
          <div className="mx-auto h-30 w-11/12 shrink-0 rounded-lg border-1 border-[rgb(99_102_241_/_1)] sm:w-1/2">
            <div className="flex h-3/5 justify-center p-4">
              <textarea
                style={{ paddingTop: '0.5rem' }}
                placeholder="向 FinalAI 助手 发消息，使用 @ 搜索应用"
                className=" max-h-[30vh] min-h-16 w-14/15 border-none pt-2 shadow-none outline-none"
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                  <div>
                    <Space>
                      <ChatMessageIcon></ChatMessageIcon>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
