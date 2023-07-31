import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useEffect } from 'react';
import { useState } from 'react';
import { deleteFollowUser, getCurrentUser, postFollowUser } from '@src/apis/user';
import { IUserInfo } from '@src/types/user';
import MyArticleItem from './atoms/myArticleItem';
import { useNavigate } from 'react-router';

import useGetProfile from '@src/hooks/useGetProfile';
import { useGetArticles } from '@src/hooks/useGetArticles';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


export default function Profile() {
  const accessToken = useRecoilValue(userAtom)?.token;
  const navigate = useNavigate();
  let username: string = location.pathname.substring(9);
  username = decodeURI(username);

  const [currentUser, setcurrentUser] = useState<IUserInfo>();
  const userInfo = useRecoilValue(userAtom);
  const [tab, setTab] = useState<string>('MyArticle');
  const [articleActive, setArticleActive] = useState('active');
  const [favoriteActvie, setFavoriteActive] = useState('');

  const { data: userProfile } = useGetProfile(username);
  const [follow, setFollow] = useState(userProfile?.following);

  useEffect(() => {
    const currentUserRes = getCurrentUser(userInfo?.token);
    currentUserRes.then((res) => setcurrentUser(res));
  }, []);

  const onClickSettingBtn = () => {
    navigate('/settings');
  };
  const onArticleClick = () => {
    setTab('MyArticle');
    setArticleActive('active');
    setFavoriteActive('');
  };
  const onFavoriteClick = () => {
    setTab('Favorite');
    setArticleActive('');
    setFavoriteActive('active');
  };
  const onFollowClick = () => {
    setFollow(true);
    postFollowUser(accessToken as string, username as string);
  };

  const onUnfollowClick = () => {
    setFollow(false);
    deleteFollowUser(accessToken as string, username as string);
  };

  const { data: myArticleList } = useGetArticles({
    path: 'articles',
    accessToken: userInfo?.token,
    params: { author: username },
  });

  const { data: favoritedArticleList } = useGetArticles({
    path: 'articles',
    accessToken: userInfo?.token,
    params: { favorited: username },
  });

  useEffect(() => {
    console.log(favoritedArticleList);
  }, [favoritedArticleList]);

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={userProfile?.image} className="user-img" />
                <h4>{userProfile?.username}</h4>
                <p>{userProfile?.bio}</p>
                {username === currentUser?.username ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickSettingBtn}>
                    <i className="ion-gear-a"></i>
                    &nbsp; {`Edit Profile Settings`}
                  </button>
                ) : follow ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onUnfollowClick}>
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Unfollow ${userProfile?.username}`}
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onFollowClick}>
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Follow ${userProfile?.username}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <div className={`nav-link ${articleActive}`} onClick={onArticleClick}>
                      My Articles
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className={`nav-link ${favoriteActvie}`} onClick={onFavoriteClick}>
                      Favorited Articles
                    </div>
                  </li>
                </ul>
              </div>

              {tab === 'MyArticle'
                ? myArticleList?.articles?.map((item) => <MyArticleItem data={item} key={uuidv4()} />)
                : favoritedArticleList?.articles.map((item) => <MyArticleItem data={item} key={uuidv4()} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
