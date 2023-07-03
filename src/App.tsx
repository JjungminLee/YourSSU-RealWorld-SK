import { QueryClient, QueryClientProvider } from 'react-query';
import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/login';
import SignUp from './components/signUp';
import Profile from './components/profile';
import Editor from './components/editor';
import Article from './components/article';
import Settings from './components/settings';
import Layout from './components/Layout';

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="" element={<Home />}></Route>
                  <Route path="login" element={<UserLogin />}></Route>
                  <Route path="signUp" element={<SignUp />}></Route>
                  <Route path="profile/:username" element={<Profile />}></Route>
                  <Route path="settings" element={<Settings />}></Route>
                  <Route path="editor" element={<Editor />}></Route>
                  <Route path="article/:title" element={<Article />}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </QueryClientProvider>
      </StrictMode>
    </>
  );
}

export default App;
