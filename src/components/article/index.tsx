import { userAtom } from '@src/states/UserAtom';
import { useNavigate, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import { deleteArticleDetail } from '@src/apis/articles';
import useGetProfile from '@src/hooks/useGetProfile';

import { useEffect, useState } from 'react';
import CommentWrite from './atoms/CommentWrite';
import Comment from './atoms/Comment';
import { useGetComments } from '@src/hooks/useGetComments';
import LikeButton from './atoms/LikeButton';
import { useGetArticleDetail } from '@src/hooks/useGetArticleDetail';
import { deleteFollowUser, postFollowUser } from '@src/apis/user';

export interface IArticleProps {
  title: string;
  body: string;
  created: string;
  author: string;
  tagList: any[];
}

export default function Article() {
  const navigate = useNavigate();
  const accessToken: string = useRecoilValue(userAtom)?.token as string;
  const username = useRecoilValue(userAtom)?.username;
  const profileImg = useRecoilValue(userAtom)?.image;
  const { value } = useParams();
  console.log(value);

  const { data: articleDetail } = useGetArticleDetail({ value: value as string, accessToken });
  const { data: authorProfile } = useGetProfile(username as string);
  const [follow, setFollow] = useState(authorProfile?.following);

  const { data: commentsData } = useGetComments({
    path: `articles/${value}/comments`,
    accessToken: accessToken,
    params: { slug: value as string },
  });
  useEffect(() => {
    console.log(commentsData);
  }, [commentsData]);

  console.log(authorProfile?.username, authorProfile?.following);

  const onDeleteArticle = async (slug: string) => {
    const res = await deleteArticleDetail(accessToken, slug);
    if (res === '') {
      navigate('/');
    }
  };

  const onEditArticle = async (slug: string) => {
    navigate(`/editor/${slug}`);
  };
  const onFollowClick = () => {
    setFollow(true);
    postFollowUser(accessToken as string, authorProfile?.username as string);
  };

  const onUnfollowClick = () => {
    setFollow(false);
    deleteFollowUser(accessToken as string, authorProfile?.username as string);
  };

  useEffect(() => {
    console.log(articleDetail);
  }, [articleDetail]);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleDetail?.title}</h1>

          <div className="article-meta">
            <a href={`/profile/${articleDetail?.author.username}`}>
              <img src={articleDetail?.author.image} />
            </a>
            <div className="info">
              <a href={`/profile/${articleDetail?.author.username}`} className="author">
                {articleDetail?.author.username}
              </a>
              <span className="date">{articleDetail?.createdAt}</span>
            </div>
            {articleDetail?.author.username === username ? (
              <>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => onEditArticle(articleDetail?.slug as string)}>
                  <i className="ion-edit"></i>
                  &nbsp; Edit Article
                </button>
                &nbsp;
                <button
                  className="btn btn-outline-danger btn-sm "
                  onClick={() => onDeleteArticle(articleDetail?.slug as string)}>
                  <i className="ion-trash-a"></i>
                  &nbsp; Delete Article
                </button>
              </>
            ) : !follow ? (
              <button className="btn btn-sm btn-outline-secondary" onClick={onFollowClick}>
                <i className="ion-plus-round"></i>
                &nbsp; {`Follow ${articleDetail?.author.username}`} <span className="counter">(10)</span>
              </button>
            ) : (
              <button className="btn btn-sm btn-outline-secondary" onClick={onUnfollowClick}>
                <i className="ion-plus-round"></i>
                &nbsp; {`Unfollow ${articleDetail?.author.username}`} <span className="counter">(10)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{articleDetail?.body}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html">
              <img src={articleDetail?.author.image} />
            </a>
            <div className="info">
              <a href="" className="author">
                {articleDetail?.author.username}
              </a>
              <span className="date">{articleDetail?.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; {`Follow ${articleDetail?.author.username}`}
            </button>
            &nbsp;
            {articleDetail && (
              <LikeButton
                favoritesCount={articleDetail?.favoritesCount}
                defaultFavorited={articleDetail?.favorited}
                slug={articleDetail?.slug}
                token={accessToken}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentWrite accessToken={accessToken} slug={value as string} profileImg={profileImg as string} />
            {commentsData?.comments?.map((item) => {
              return <Comment data={item} token={accessToken} slug={value as string} key={item?.createdAt} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
