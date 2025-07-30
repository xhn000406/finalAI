/*
 * @Author: 小徐 xboxlive7723594@hotmail.com
 * @Date: 2025-07-30 22:47:31
 * @LastEditors: 小徐 xboxlive7723594@hotmail.com
 * @LastEditTime: 2025-07-30 23:41:47
 * @FilePath: \finalAI\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import '@/css/main.css';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
