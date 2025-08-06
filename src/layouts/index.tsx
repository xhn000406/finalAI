/*
 * @Author: 小徐 xboxlive7723594@hotmail.com
 * @Date: 2025-07-30 22:47:31
 * @LastEditors: 小徐 xboxlive7723594@hotmail.com
 * @LastEditTime: 2025-07-31 01:37:46
 * @FilePath: \finalAI\src\layouts\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ChatMessage from "@/views/ChatMessage";
import SliderBar from "@/views/SliderBar";
import classnames from "classnames";
import { useState } from "react";

import { useSpring, animated } from "react-spring";

export default function Layouts() {
  const [isShowSliderValue, setIsShowSliderValue] = useState(false);

  const props = useSpring({
    width: isShowSliderValue ? 250 : 0,
    opacity: isShowSliderValue ? 1 : 0,
    overflow: "hidden",
  });

  const handleIsShowSlider = (e: boolean) => {
    console.log("e", e);
    setIsShowSliderValue(e);
  };

  const handleCloseSlider = () => {
    console.log("关闭折叠");
    setIsShowSliderValue(false);
  };

  return (
    <div className="flex">
      {/* 只在展开时显示的遮罩层 */}
      {isShowSliderValue && (
        <div
          className="fixed inset-0 z-40 bg-gray bg-opacity-50"
          onClick={handleCloseSlider} // 点击遮罩层关闭
        />
      )}

      {/* 滑块容器 - 阻止点击事件冒泡 */}
      <div
        className={classnames("z-50 w-0 sm:h-dvh sm:w-50", {
          fixed: isShowSliderValue,
        })}
      >
        <animated.div
          style={props}
          onClick={(e) => e.stopPropagation()} // 阻止点击滑块内容时关闭
        >
          <SliderBar />
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
