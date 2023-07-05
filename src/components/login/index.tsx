import React from 'react';
import { ILogin, PostSignInReq } from '../../types/user';
import useInput from '../../hooks/useInput';
import Footer from '../common/Footer';

import { useSetRecoilState } from 'recoil';

import { postSignIn } from '../../apis/user';
import { useNavigate } from 'react-router';
import { userAtom, userPw } from '@src/states/UserAtom';

export default function UserLogin() {
  const [password, onChangePassword] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const setResult = useSetRecoilState(userAtom);
  const setPw = useSetRecoilState(userPw);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const info: ILogin = {
      email: email as string,
      password: password as string,
    };
    const req: PostSignInReq = {
      user: info,
    };
    const response = postSignIn(req);
    console.log(response);

    response
      .then((item) => {
        setResult(item);
        setPw(password as string);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>

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
