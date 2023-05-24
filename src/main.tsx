import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter,Router } from 'react-router-dom'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RecoilRoot> {/* RecoilRoot provider를 이용하여 recoil을 사용가능하도록 설정해줍니다. */}
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </RecoilRoot>
    </StrictMode>

  </QueryClientProvider>
  
)
