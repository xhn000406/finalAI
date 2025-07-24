import { Suspense, type JSX, type LazyExoticComponent } from 'react';

const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<() => JSX.Element> }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <props.lazyChildren />
    </Suspense>
  );
};

export default LazyImportComponent;
