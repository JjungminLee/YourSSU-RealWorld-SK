import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useEffect } from 'react';
import { useState } from 'react';
import { deleteFollowUser, getCurrentUser, getUserProfile, postFollowUser } from '@src/apis/user';
import { IUserInfo } from '@src/types/user';
import { useQuery } from 'react-query';
import { getUserArticle } from '@src/apis/articles';
import MyArticleItem from './myArticleItem';
import { useNavigate } from 'react-router';

export default function Profile() {
  const accessToken = useRecoilValue(userAtom)?.token;
  const navigate = useNavigate();

  let user: string = location.pathname.substring(9);
  user = decodeURI(user);

  const [currentUser, setcurrentUser] = useState<IUserInfo>();
  const userInfo = useRecoilValue(userAtom);
  const [tab, setTab] = useState<string>('MyArticle');
  const [articleActive, setArticleActive] = useState('active');
  const [favoriteActvie, setFavoriteActive] = useState('');
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const currentUserRes = getCurrentUser(userInfo?.token);
    currentUserRes.then((res) => setcurrentUser(res));
  }, []);

  const onClickFollowBtn = () => {
    postFollowUser(accessToken as string, user);
    setFollow((prev) => !prev);
  };
  const onClickUnfollowBtn = () => {
    deleteFollowUser(accessToken as string, user);
    setFollow((prev) => !prev);
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

  const { data: userProfile } = useQuery(['userProfile', follow], () =>
    getUserProfile(accessToken as string, user as string),
  );
  console.log(user);
  console.log(userProfile?.following);
  console.log(follow, 'ffff');

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
                      slug={item.slug}
                      author={item.author.username}
                      date={item.createdAt}
                      title={item.title}
                      subTitle={item.description}
                      tagList={item.tagList}
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
