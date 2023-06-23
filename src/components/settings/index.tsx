import LoginNavbar from '../common/LoginNavbar';
import Footer from '../common/Footer';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { userPw } from '@src/states/UserAtom';

export default function Settings() {
  const userInfo = useRecoilValue(userAtom);
  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control" type="text" placeholder={`${userInfo?.image}`} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder={`${userInfo?.username}`} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control form-control-lg" rows={8} placeholder="Short bio about you" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder={`${userInfo?.email}`} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" value={`${userPw}`} />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger">Or click here to logout.</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
