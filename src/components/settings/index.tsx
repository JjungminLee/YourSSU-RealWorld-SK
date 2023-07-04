import Footer from '../common/Footer';
import { useRecoilValue } from 'recoil';
import { userAtom, userPw } from '@src/states/UserAtom';
import useInput from '@src/hooks/useInput';
import { useNavigate } from 'react-router';
import { IUserInfo, PatchUserReq } from '@src/types/user';
import { patchtUserInfo } from '@src/apis/user';

export default function Settings() {
  const userInfo = useRecoilValue(userAtom);
  const pw = useRecoilValue(userPw);
  const navigate = useNavigate();

  const [name, setName] = useInput(userInfo?.username as string);
  const [image, setImage] = useInput(userInfo?.image as string);
  const [bio, setBio] = useInput('');
  const [email, setEmail] = useInput(userInfo?.email as string);
  const [password, setPassword] = useInput(pw);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const info: IUserInfo = { username: name, image: image, email: email, password: password, bio: bio };
    console.log(info);
    // todo : 이거 atom도 바꿔야함
    const req: PatchUserReq = {
      user: info,
    };
    console.log(userInfo?.token);
    const response = patchtUserInfo(req, userInfo?.token as string);

    response
      .then(() => {
        navigate(`/profile/${name}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogOut = () => {
    localStorage.removeItem('recoil-persist');
    window.location.replace('/');
  };

  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      value={image}
                      onChange={setImage}
                      type="text"
                      placeholder={`${userInfo?.image}`}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      value={name}
                      onChange={setName}
                      type="text"
                      placeholder={`${userInfo?.username}`}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      value={bio}
                      onChange={setBio}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      value={email}
                      onChange={setEmail}
                      type="text"
                      placeholder={`${userInfo?.email}`}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      value={`${pw}`}
                      onChange={setPassword}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger" onClick={onLogOut}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
