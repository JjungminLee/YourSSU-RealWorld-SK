import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useEffect } from 'react';
import { useState } from 'react';
import { deleteFollowUser, getCurrentUser, getUserProfile, postFollowUser } from '@src/apis/user';
import { IUserInfo } from '@src/types/user';
import { useQuery } from 'react-query';
import { getUserArticle } from '@src/apis/articles';
import MyArticleItem from './myArticleItem';
import { useGetArticles } from '@src/hooks/useGetArticles';
import { useNavigate } from 'react-router';

export default function Profile() {
  const accessToken = useRecoilValue(userAtom)?.token;
  const navigate = useNavigate();
  const user: string = location.pathname.substring(9);
  const [currentUser, setcurrentUser] = useState<IUserInfo>();
  const userInfo = useRecoilValue(userAtom);
  const [tab, setTab] = useState<string>('MyArticle');
  const [articleActive, setArticleActive] = useState('active');
  const [favoriteActvie, setFavoriteActive] = useState('');

  useEffect(() => {
    const currentUserRes = getCurrentUser(userInfo?.token);
    currentUserRes.then((res) => setcurrentUser(res));
  }, []);

  const onClickFollowBtn = () => {
    postFollowUser(accessToken as string, user);
    location.reload();
  };
  const onClickUnfollowBtn = () => {
    deleteFollowUser(accessToken as string, user);
    location.reload();
  };
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

  const { data: myArticleList } = useQuery(['myArticles', user as string, accessToken as string], () =>
    getUserArticle(user as string, accessToken as string),
  );

  const { data: userProfile } = useQuery(['userProfile', accessToken as string, user as string], () =>
    getUserProfile(accessToken as string, user as string),
  );

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
                {user === currentUser?.username ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickSettingBtn}>
                    <i className="ion-gear-a"></i>
                    &nbsp; {`Edit Profile Settings`}
                  </button>
                ) : userProfile?.following ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickUnfollowBtn}>
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Unfollow ${userProfile?.username}`}
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickFollowBtn}>
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
                ? myArticleList?.map((item) => (
                    <MyArticleItem
                      author={item.author.username}
                      date={item.createdAt}
                      title={item.title}
                      subTitle={item.description}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
