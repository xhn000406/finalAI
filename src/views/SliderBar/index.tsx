import { Space, type SiderProps } from 'antd';
import { SliderBarIcon } from '../../components/svg';

interface SliderBarProps {
    onClose?: () => void
  }
export default function SliderBar({ onClose }: SliderBarProps) {
  
  return (
    <div className=" h-dvh bg-white z-50 flex flex-col">
      <div className="flex   items-center justify-between p-4">
        <div className='h-7 w-7 rounded-lg'>
          <img className='w-7 h-7' src="@/logo-89dd0dfe.png" />
        </div>
        <div className='text-[rgb(99_102_241_/_1)] font-bold'>FInalAi助手</div>
        <div onClick={onClose}>
          <Space>
            <SliderBarIcon></SliderBarIcon>
          </Space>
        </div>
      </div>
     <div className='flex-1'>
       {/* 历史对话标题 */}
      <div className=' w-full flex justify-between items-center pl-5'>
        <div className='text-xs font-bold'>历史对话（1）</div>
      </div>
      {/* 历史对话列表 */}
      <div className='flex items-center justify-center mt-5'>
        <div className='flex justify-between items-center w-4/5 h-10 bg-[#fff] rounded-xl text-sm'>
          <div className=' pl-3 text-[rgb(99_102_241_/_1)]'>新对话</div>
          <div className=' pr-3 text-[rgb(99_102_241_/_1)]'>...</div>
        </div>
      </div>
     </div>
      {/* 登陆注册 */}
      <div className='p-4 mt-auto'>
        <div className='flex justify-center'>
        <div className='w-9/10 h-10 rounded-full bg-[#fff] border-1 border-[#e3e3e3] flex justify-center items-center'>
          <div className='text-[#6b7280] text-2xs'>登录 / 注册</div>
        </div>
      </div>
      </div>
    </div>
  );
}
