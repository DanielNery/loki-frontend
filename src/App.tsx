import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { LoadingProvider } from './hooks/useLoading';
import { GlobalLoading } from './components/GlobalLoading';

function App() {
  return (
    <LoadingProvider>
      <GlobalLoading />
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
