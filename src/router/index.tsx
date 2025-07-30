import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LazyImportComponent from '@/components/LazyImportComponent';

const routes = [
  {
    path: '/',
    element: (
      <LazyImportComponent
        lazyChildren={lazy(() => import('@/layouts/index'))}
      />
    ),
  },
];

//可传第二个参数，配置base路径，例如{ basename: "/app"}
const router = createBrowserRouter(routes);

export default router;
