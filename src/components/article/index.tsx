import { userAtom } from '@src/states/UserAtom';
import { useNavigate, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { postFollowUser, deleteFollowUser } from '@src/apis/user';
import { deleteArticleDetail, getArticleDetail } from '@src/apis/articles';
import { getUserProfile } from '@src/apis/user';
import { useQuery } from 'react-query';
import { useState } from 'react';

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
  const { id } = useParams();
  const [follow, setFollow] = useState(false);
  const { data: articleDetail } = useQuery(['articleDetail', id as string], () => getArticleDetail(id as string));
  const { data: authorProfile } = useQuery(['authorProfile', follow], () =>
    getUserProfile(accessToken as string, articleDetail?.author.username as string),
  );
  console.log(username, articleDetail?.author.username);

  console.log(follow, 'fff');
  console.log(authorProfile?.following);

  const onClickFollowBtn = () => {
    postFollowUser(accessToken as string, articleDetail?.author.username as string);
    setFollow((prev) => !prev);
  };
  const onClickUnfollowBtn = () => {
    deleteFollowUser(accessToken as string, articleDetail?.author.username as string);
    setFollow((prev) => !prev);
  };

  const onDeleteArticle = async (slug: string) => {
    const res = await deleteArticleDetail(accessToken, slug);
    if (res === '') {
      navigate('/');
    }
  };
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleDetail?.title}</h1>

          <div className="article-meta">
            <a href="">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href={`/profile/${articleDetail?.author.username}`} className="author">
                {articleDetail?.author.username}
              </a>
              <span className="date">{articleDetail?.createdAt}</span>
            </div>
            {articleDetail?.author.username === username ? (
              <>
                <button className="btn btn-outline-secondary btn-sm">
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
            ) : !authorProfile?.following ? (
              <button className="btn btn-sm btn-outline-secondary" onClick={onClickFollowBtn}>
                <i className="ion-plus-round"></i>
                &nbsp; {`Follow ${articleDetail?.author.username}`} <span className="counter">(10)</span>
              </button>
            ) : (
              <button className="btn btn-sm btn-outline-secondary" onClick={onClickUnfollowBtn}>
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
              <img src="http://i.imgur.com/Qr71crq.jpg" />
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
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Article <span className="counter">(29)</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
