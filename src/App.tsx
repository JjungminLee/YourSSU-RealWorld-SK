import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import styled from '@emotion/styled/macro';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/login';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<UserLogin />}></Route>
                <Route path="/" element={<Home />}></Route>
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </QueryClientProvider>
      </StrictMode>
    </>
  );
}

export default App;
