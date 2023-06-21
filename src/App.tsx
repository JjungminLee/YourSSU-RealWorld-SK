import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import UserLogin from './components/login/index.tsx'

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
     
  )
}

export default App
