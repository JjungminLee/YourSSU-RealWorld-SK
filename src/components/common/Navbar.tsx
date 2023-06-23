import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './style.css';

export default function Navbar() {
  const [home, setHome] = useState<string>('');
  const [signIn, setSignIn] = useState<string>('');
  const [signUp, setSignUp] = useState<string>('');
  const location = useLocation();
  console.log(location.pathname);

  const navigate = useNavigate();
  const onHomeChange = () => {
    navigate('/');
  };
  const onLoginChange = () => {
    navigate('/login');
  };
  const onSignUpChange = () => {
    navigate('/signUp');
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setHome('actvie');
      setSignIn('');
      setSignUp('');
    } else if (location.pathname === '/login') {
      setHome('');
      setSignIn('active');
      setSignUp('');
    } else {
      setHome('');
      setSignIn('');
      setSignUp('active');
    }
  }, [location.pathname]);
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <div className="navbar-brand" onClick={onHomeChange}>
            conduit
          </div>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <div className={`nav-link ${home}`} onClick={onHomeChange}>
                Home
              </div>
            </li>

            <li className="nav-item">
              <div className={`nav-link ${signIn}`} onClick={onLoginChange}>
                Sign in
              </div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${signUp}`} onClick={onSignUpChange}>
                Sign up
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
