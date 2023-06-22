import { useLocation, useNavigate } from 'react-router';
import './style.css';

export default function Navbar() {
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
  if (location.pathname === '/') {
    return (
      <>
        <nav className="navbar navbar-light">
          <div className="container">
            <div className="navbar-brand" onClick={onHomeChange}>
              conduit
            </div>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <div className="nav-link active" onClick={onHomeChange}>
                  Home
                </div>
              </li>

              <li className="nav-item">
                <div className="nav-link" onClick={onLoginChange}>
                  Sign in
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link" onClick={onSignUpChange}>
                  Sign up
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else if (location.pathname === '/login') {
    return (
      <>
        <nav className="navbar navbar-light">
          <div className="container">
            <div className="navbar-brand" onClick={onHomeChange}>
              conduit
            </div>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <div className="nav-link" onClick={onHomeChange}>
                  Home
                </div>
              </li>

              <li className="nav-item">
                <div className="nav-link" onClick={onLoginChange}>
                  Sign in
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link" onClick={onSignUpChange}>
                  Sign up
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar navbar-light">
          <div className="container">
            <div className="navbar-brand" onClick={onHomeChange}>
              conduit
            </div>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <div className="nav-link" onClick={onHomeChange}>
                  Home
                </div>
              </li>

              <li className="nav-item">
                <div className="nav-link" onClick={onLoginChange}>
                  Sign in
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link active" onClick={onSignUpChange}>
                  Sign up
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
