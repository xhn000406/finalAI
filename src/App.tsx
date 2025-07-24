import '@/css/main.css'
import { ConfigProvider } from 'antd';
import router from './router';
import { RouterProvider } from 'react-router-dom';
const App = () => {
  return (
   <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
   <RouterProvider router={router} />
  </ConfigProvider>
  );
};

export default App;
