import { useGetTag } from '@src/hooks/useGetTag';
import PopularTag from './atoms/PopularTag';
import { useEffect } from 'react';
import ArticlePreview from './atoms/ArticlePreview';
import { useGetArticles } from '@src/hooks/useGetArticles';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { userAtom } from '@src/states/UserAtom';
import { useRecoilValue } from 'recoil';
import LoginNavbar from '../common/LoginNavbar';

export default function Home() {
  // 임의 데이터
  const { data: tags } = useGetTag({ path: 'tags' });
  const { data: articles } = useGetArticles({ path: 'articles' });

  const userData = useRecoilValue(userAtom);
  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <>
      {userData === null ? <Navbar /> : <LoginNavbar />}
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
                  {/* 로그인 후에 뜨게함 - active / disabled  */}
                  {/* <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {articles ? (
                articles.articles.map((item) => <ArticlePreview data={item} key={uuidv4()} />)
              ) : (
                <div className="article-preview">Loading Articles...</div>
              )}
            </div>
            <PopularTag tag={tags} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
