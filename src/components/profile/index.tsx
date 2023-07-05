import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCurrentUser } from '@src/apis/user';
import { IUserInfo } from '@src/types/user';
import { useQuery } from 'react-query';
import { getUserArticle } from '@src/apis/articles';
import MyArticleItem from './myArticleItem';

export default function Profile() {
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

  const onClickFollowBtn = () => {};
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

  const { data: myArticleList } = useQuery(['myArticles'], () => getUserArticle(), {
    select: (data) => data.filter((item) => item.author.username === 'Anah Benešová'),
  });
  console.log(myArticleList);

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={currentUser?.image} className="user-img" />
                <h4>{currentUser?.username}</h4>
                <p>{currentUser?.bio}</p>
                {user === currentUser?.username ? (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickFollowBtn}>
                    <i className="ion-gear-a"></i>
                    &nbsp; {`Edit Profile Settings`}
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={onClickFollowBtn}>
                    <i className="ion-plus-round"></i>
                    &nbsp; {`Follow ${currentUser?.username}`}
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
