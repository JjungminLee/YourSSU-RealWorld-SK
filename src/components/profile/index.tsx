import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCurrentUser } from '@src/apis/user';
import { IUserInfo } from '@src/types/user';
import { useQuery } from 'react-query';
import { getUserArticle } from '@src/apis/articles';
import MyArticleItem from './myArticleItem';
import { useNavigate } from 'react-router';
import { usePostFollow } from '@src/hooks/usePostFollow';
import { usePostUnfollow } from '@src/hooks/usePostUnfollow';
import useGetProfile from '@src/hooks/useGetProfile';

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

  const { data: userProfile } = useGetProfile(accessToken as string, username);
  console.log(userProfile?.username);
  console.log(userProfile?.following);
  const { mutate: postFollow } = usePostFollow();
  const { mutate: postUnFollow } = usePostUnfollow();

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

  const { data: myArticleList } = useQuery(['myArticles', username as string, accessToken as string], () =>
    getUserArticle(username as string, accessToken as string),
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
                {username === currentUser?.username ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickSettingBtn}>
                    <i className="ion-gear-a"></i>
                    &nbsp; {`Edit Profile Settings`}
                  </button>
                ) : userProfile?.following ? (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={() => postUnFollow({ accessToken: accessToken as string, username: username })}>
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Unfollow ${userProfile?.username}`}
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={() => postFollow({ accessToken: accessToken as string, username: username })}>
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
