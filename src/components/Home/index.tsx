import { useGetTag } from '../../hooks/useGetTag';
import PopularTag from './atoms/PopularTag';
import { useState } from 'react';
import ArticlePreview from './atoms/ArticlePreview';
import { useGetArticles } from '../../hooks/useGetArticles';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../../states/UserAtom';
import Pagination from '../common/Pagination';
import { pageState } from '@src/states/pageState';
import { tagState } from '@src/states/tagState';

export default function Home() {
  // 임의 데이터
  const userData = useRecoilValue(userAtom);
  const page = useRecoilValue(pageState);
  const [selectedTag, setSelectedTag] = useRecoilState(tagState);

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
  const { data: tagArticles } = useGetArticles({
    path: 'articles',
    params: { tag: selectedTag },
  });

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
                        setSelectedTag('');
                        if (tabSelected != 'your') setTabSelected('your');
                      }}>
                      <a className={`nav-link ${tabSelected == 'your' && selectedTag == '' ? `active` : `disabled`}`}>
                        Your Feed
                      </a>
                    </li>
                  )}
                  <li
                    className="nav-item"
                    onClick={() => {
                      setSelectedTag('');
                      if (tabSelected != 'global') setTabSelected('global');
                    }}>
                    <a className={`nav-link ${tabSelected == 'global' && selectedTag == '' ? `active` : `disabled`}`}>
                      Global Feed
                    </a>
                  </li>
                  {selectedTag !== '' && (
                    <li className="nav-item">
                      <a className={`nav-link active ng-binding`}>
                        <i className="ion-pound"></i>
                        {` ${selectedTag}`}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              {selectedTag == '' &&
                (tabSelected == 'global' ? (
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
                ))}
              {selectedTag !== '' &&
                (tagArticles ? (
                  tagArticles?.articles.length === 0 ? (
                    <div className="article-preview">No articles are here... yet.</div>
                  ) : (
                    tagArticles.articles.map((item) => (
                      <ArticlePreview data={item} token={userData?.token} key={uuidv4()} />
                    ))
                  )
                ) : (
                  <div className="article-preview">Loading Articles...</div>
                ))}
            </div>
            <PopularTag tag={tags} />
          </div>
          {tabSelected == 'global' && selectedTag == ''
            ? articles?.articlesCount !== undefined && (
                <Pagination limit={Math.ceil(articles?.articlesCount / 10)}></Pagination>
              )
            : myArticles?.articlesCount !== undefined && (
                <Pagination limit={Math.ceil(myArticles?.articlesCount / 10)}></Pagination>
              )}
        </div>
      </div>
    </>
  );
}
