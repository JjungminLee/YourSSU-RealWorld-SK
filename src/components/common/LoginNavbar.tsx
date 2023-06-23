import { userAtom } from '@src/states/UserAtom';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';
import './style.css';

export default function LoginNavbar() {
  const [home, setHome] = useState('');
  const [editor, setEditor] = useState('');
  const [settings, setSettings] = useState('');
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userAtom);
  console.log(location.pathname);
  const onHomeChange = () => {
    navigate('/');
  };

  const onEditorChange = () => {
    navigate('/editor');
  };
  const onSettingsChange = () => {
    navigate('/settings');
  };
  const onProfileChange = () => {
    navigate(`/profile/${userInfo?.username}`);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setHome('actvie');
      setEditor('');
      setSettings('');
      setProfile('');
    } else if (location.pathname === '/editor') {
      setHome('');
      setEditor('active');
      setSettings('');
      setProfile('');
    } else if (location.pathname === '/settings') {
      setHome('');
      setEditor('');
      setSettings('active');
      setProfile('');
    } else {
      setHome('');
      setEditor('');
      setSettings('');
      setProfile('active');
    }
  }, []);

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
              <div className={`nav-link ${editor}`} onClick={onEditorChange}>
                {' '}
                <i className="ion-compose"></i>&nbsp;New editor{' '}
              </div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${settings}`} onClick={onSettingsChange}>
                <i className="ion-gear-a"></i>&nbsp;Settings
              </div>
            </li>
            <li className="nav-item">
              <div className={`nav-link ${profile}`} onClick={onProfileChange}>
                {userInfo?.username}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
