import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import UserLogin from './components/login/index.tsx'




const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <BrowserRouter>
            <RecoilRoot>
                 <Routes> 
                  <Route path="/login" element={<UserLogin/>}></Route>
                  
                 </Routes> 
            </RecoilRoot>
           </BrowserRouter> 
        </StrictMode>

  </QueryClientProvider>
    </>
     
  )
}

export default App
