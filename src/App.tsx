
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter,Router } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import UserLogin from './components/UserLogin.tsx'
import Home from './components/Home.tsx'


const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RecoilRoot>
            <BrowserRouter>
              <Routes>
                <Route></Route>
                <Route path="/login" element={<UserLogin/>}></Route>
                <Route path="/" element={<Home/>}></Route>
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </StrictMode>

  </QueryClientProvider>
    </>
     
  )
}

export default App
