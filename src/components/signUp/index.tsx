import useInput from '../../hooks/useInput';

import { useState } from 'react';
import { postSignUp } from '@src/apis/user';
import { ISignUp } from '@src/types/user';
import { useNavigate } from 'react-router';

import { useSetRecoilState } from 'recoil';
import { userAtom } from '@src/states/UserAtom';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, onChangeName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const setResult = useSetRecoilState(userAtom);
  const [message, setMessage] = useState<string[]>([]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const info: ISignUp = {
      username: name,
      email: email,
      password: password,
    };

    const response = await postSignUp(info);
    console.log(response);

    if (response.status != 422) {
      setResult(response.user);
      setMessage([]);
      navigate('/');
    } else {
      const { errors } = response.data;
      console.log(errors);
      if ('username' in errors) {
        const username = `username ${errors.username[0]}`;
        let copy = message; // 배열의 주소를 공우
        copy.push(username);
        setMessage([...copy]);
      }
      if ('email' in errors) {
        const email = `email ${errors.email[0]}`;
        let copy = message;
        copy.push(email);
        setMessage([...copy]);
      }

      if ('password' in errors) {
        const pw = `password ${errors.password[0]}`;
        let copy = message; // 배열의 주소를 공우
        copy.push(pw);
        setMessage([...copy]);
      }
      console.log(message.length);
    }
  };

  //   <ul className="error-messages">
  //   <li>{message}</li>
  // </ul>
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href={`/login`}>Have an account?</a>
              </p>

              {message.length > 1
                ? message.map((item) => (
                    <ul className="error-messages">
                      <li>{item}</li>
                    </ul>
                  ))
                : null}
              <form onSubmit={onSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={onChangeName}
                  />
                </fieldset>
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

                <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
