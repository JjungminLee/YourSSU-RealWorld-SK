import React from 'react';
import { useGetTag } from '../../hooks/useGetTag';
import PopularTag from './atoms/PopularTag';
import { useEffect, useState } from 'react';
import ArticlePreview from './atoms/ArticlePreview';
import { useGetArticles } from '../../hooks/useGetArticles';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../states/UserAtom';
import Pagination from '../common/Pagination';
import { pageState } from '@src/types/pageState';

export default function Home() {
  // 임의 데이터
  const userData = useRecoilValue(userAtom);
  const page = useRecoilValue(pageState);

  const { data: tags } = useGetTag({ path: 'tags' });
  const { data: articles } = useGetArticles({
    path: 'articles',
    accessToken: userData?.token,
    params: { offset: page * 10 },
  });
  const { data: myArticles } = useGetArticles({
    path: 'articles',
    params: { author: userData?.username },
  });

  // const updatedArticles = useMemo(() => {
  //   // console.log(articles?.articles[3].favorited);
  //   return articles;
  // }, [articles]);

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  useEffect(() => {
    console.log(myArticles);
  }, [myArticles]);

  // useEffect(() => {
  //   console.log(isStale);
  // }, [isStale]);

  const [tabSelected, setTabSelected] = useState<'global' | 'your'>(userData === null ? 'global' : 'your');

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {userData !== null && (
                    <li
                      className="nav-item"
                      onClick={() => {
                        if (tabSelected != 'your') setTabSelected('your');
                      }}>
                      <a className={`nav-link ${tabSelected == 'your' ? `active` : `disabled`}`}>Your Feed</a>
                    </li>
                  )}
                  <li
                    className="nav-item"
                    onClick={() => {
                      if (tabSelected != 'global') setTabSelected('global');
                    }}>
                    <a className={`nav-link ${tabSelected == 'global' ? `active` : `disabled`}`}>Global Feed</a>
                  </li>
                </ul>
              </div>
              {tabSelected == 'global' ? (
                articles ? (
                  articles?.articles.length === 0 ? (
                    <div className="article-preview">No articles are here... yet.</div>
                  ) : (
                    articles.articles.map((item) => (
                      <ArticlePreview data={item} token={userData?.token} key={uuidv4()} />
                    ))
                  )
                ) : (
                  <div className="article-preview">Loading Articles...</div>
                )
              ) : myArticles ? (
                myArticles?.articles.length === 0 ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  myArticles.articles.map((item) => (
                    <ArticlePreview data={item} token={userData?.token} key={uuidv4()} />
                  ))
                )
              ) : (
                <div className="article-preview">Loading Articles...</div>
              )}
            </div>
            <PopularTag tag={tags} />
          </div>
          <Pagination limit={20}></Pagination>
        </div>
      </div>
    </>
  );
}
