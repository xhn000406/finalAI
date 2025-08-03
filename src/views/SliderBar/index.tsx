import { Space } from 'antd';
import { SliderBarIcon } from '../../components/svg';

export default function SliderBar() {
  return (
    <div className=" h-dvh bg-white z-50 ">
      <div className="flex   items-center justify-between p-4">
        <div>AI</div>
        <div>FInalAi助手</div>
        <div>
          <Space>
            <SliderBarIcon></SliderBarIcon>
          </Space>
        </div>
      </div>
      <div>历史对话</div>
      <div></div>
    </div>
  );
}
