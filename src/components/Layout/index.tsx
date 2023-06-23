import { Outlet } from 'react-router';
import Navbar from '../common/Navbar';
import LoginNavbar from '../common/LoginNavbar';
import { userAtom } from '@src/states/UserAtom';
import { useRecoilValue } from 'recoil';
import Footer from '../common/Footer';

export default function Layout() {
  const userData = useRecoilValue(userAtom);
  return (
    <div>
      {userData === null ? <Navbar /> : <LoginNavbar />}
      <Outlet />
      <Footer />
    </div>
  );
}
