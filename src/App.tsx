import { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from 'hooks';
import { Routes } from 'routes';

const App: FC = () => {
  return (
    <Suspense fallback>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
