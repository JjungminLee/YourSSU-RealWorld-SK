import { ArticlesResponse } from '@src/types/articles';
import LikeButton from './LikeButton';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/states/UserAtom';
import { dateFormat } from '@src/utils/dateFormat';

export interface IMyArticleProps {
  data: ArticlesResponse;
}

export default function MyArticleItem({ data }: IMyArticleProps) {
  const userInfo = useRecoilValue(userAtom);
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <a href="">
            <img src={data.author.image} />
          </a>
          <div className="info">
            <a href={`/profile/${data.author.username}`} className="author">
              {data.author.username}
            </a>
            <span className="date">{dateFormat(data.createdAt)}</span>
          </div>
          <LikeButton
            favoritesCount={data.favoritesCount}
            defaultFavorited={data.favorited}
            slug={data.slug}
            token={userInfo?.token}
          />
        </div>
        <a href={`/article/${data.slug}`} className="preview-link">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <span>Read more...</span>
        </a>
        <ul className="tag-list">
          {data.tagList.map((item) => (
            <li className="tag-default tag-pill tag-outline" key={data.tagList.indexOf(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
