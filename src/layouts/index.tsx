/*
 * @Author: 小徐 xboxlive7723594@hotmail.com
 * @Date: 2025-07-30 22:47:31
 * @LastEditors: 小徐 xboxlive7723594@hotmail.com
 * @LastEditTime: 2025-07-31 01:37:46
 * @FilePath: \finalAI\src\layouts\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ChatMessage from '@/views/ChatMessage';
import SliderBar from '@/views/SliderBar';
import classnames from 'classnames';
import { useState,useEffect  } from 'react';

import { useSpring, animated } from 'react-spring';

export default function Layouts() {
  const [isShowSliderValue, setIsShowSliderValue] = useState(false);
  // 添加响应式逻辑：PC端默认打开侧边栏
  useEffect(()=>{
    // 检测屏幕宽度，PC端（宽度≥768px）默认打开侧边栏
    const handleResize = () => {
      if(window.innerWidth >= 768) {
        setIsShowSliderValue(true)
      }else{
        setIsShowSliderValue(false)
      }
    }
    // 初始化执行一次
    handleResize();
    // 添加窗口大小变化监听
    window.addEventListener('resize',handleResize);

    return () => window.removeEventListener('resize',handleResize);
  },[])


  const props = useSpring({
    width: isShowSliderValue ? 250 : 0,
    opacity: isShowSliderValue ? 1 : 0,
    overflow: 'hidden',
  });

  const handleIsShowSlider = (e: boolean) => {
    console.log('e', e);
    setIsShowSliderValue(e);
  };

  const handleCloseSlider = () => {
    console.log('关闭折叠');
    setIsShowSliderValue(false);
    // 在移动端关闭侧边栏，PC端保持打开
    // if(window.innerWidth < 768) {
    //   setIsShowSliderValue(false)
    // }
  };
  // 判断是否是移动设备
  const isMobile = window.innerWidth < 768;



  return (
    <div className="flex">
      {/* 只在展开时显示的遮罩层 */}
      {isShowSliderValue && isMobile && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-gray bg-opacity-50"
          onClick={handleCloseSlider} // 点击遮罩层关闭
        />
      )}

      {/* 滑块容器 - 阻止点击事件冒泡 */}
      <div
        className={classnames('z-50 w-0 h-dvh', {
          'fixed': isMobile && isShowSliderValue,
          'sticky top-0': !isMobile,
        })}
      >
        <animated.div
          style={props}
          onClick={(e) => e.stopPropagation()} // 阻止点击滑块内容时关闭
          className="h-full"
        >
          <SliderBar onClose={handleCloseSlider} />
        </animated.div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 z-10">
        <ChatMessage
          handleIsShowSlider={handleIsShowSlider}
          isShowSliderValue={isShowSliderValue}
        />
      </div>
    </div>
  );
}
