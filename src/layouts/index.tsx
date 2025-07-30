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
export default function Layouts() {
  return (
    <div className="flex">
      <div className="hidden w-0 bg-amber-200 sm:inline-block sm:h-dvh sm:w-50">
        <SliderBar />
      </div>
      <div className="flex-1">
        <ChatMessage />
      </div>
    </div>
  );
}
