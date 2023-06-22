import { useNavigate } from 'react-router';
export default function Navbar() {
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
}
