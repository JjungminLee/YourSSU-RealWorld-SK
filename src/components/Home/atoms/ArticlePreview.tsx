import { ArticlesResponse } from '@src/types/articles';
import Profile from './Profile';
import { v4 as uuidv4 } from 'uuid';
import { dateFormat } from '@src/utils/dateFormat';
import LikeButton from './LikeButton';

export default function ArticlePreview({ data, token }: { data: ArticlesResponse; token?: string }) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Profile authorData={data?.author} dateData={dateFormat(data?.updatedAt)} />
        {/* 좋아요 로그인 제한 걸기 */}

        <LikeButton
          defaultFavorited={data?.favorited}
          favoritesCount={data?.favoritesCount}
          slug={data?.slug}
          token={token}
        />
      </div>
      <a href="" className="preview-link">
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {data?.tagList.map((item) => (
            <li className="tag-default tag-pill tag-outline" key={uuidv4()}>
              {item}
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
}
