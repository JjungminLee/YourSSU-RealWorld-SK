import { PostSignInReq } from '@src/types/user';
import useInput from './atom/input';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import { postSignIn } from '@src/apis/user';
import { ILogin } from '@src/types/user';
import './style.css';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useNavigate } from 'react-router';

export default function UserLogin() {
  const [password, onChangePassword] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const setResult = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const info: ILogin = {
      email: email,
      password: password,
    };
    const req: PostSignInReq = {
      user: info,
    };
    const response = postSignIn(req);

    response.then((item) => {
      setResult(item);
      navigate('/');
    });
  };
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              {/* <ul className="error-messages">
                <li>That email is already taken</li>
                </ul> */}
              <form onSubmit={onSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </fieldset>

                <button className="btn btn-lg btn-primary pull-xs-right">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
