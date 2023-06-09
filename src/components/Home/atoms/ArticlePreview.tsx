import { ArticlesResponse } from '@src/types/articles';
import Profile from './Profile';
import { v4 as uuidv4 } from 'uuid';
import { dateFormat } from '@src/utils/dateFormat';
import LikeButton from './LikeButton';
import { useNavigate } from 'react-router';

export default function ArticlePreview({ data, token }: { data: ArticlesResponse; token?: string }) {
  const navigate = useNavigate();
  const onClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Profile authorData={data?.author} dateData={dateFormat(data?.updatedAt)} />
        <LikeButton
          defaultFavorited={data?.favorited}
          favoritesCount={data?.favoritesCount}
          slug={data?.slug}
          token={token}
        />
      </div>
      <div className="preview-link" onClick={() => onClick(data?.slug)}>
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
      </div>
    </div>
  );
}
