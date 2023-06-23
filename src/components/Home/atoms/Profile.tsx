import { AuthorResponse } from '@src/types/articles';

export default function Profile({ authorData, dateData }: { authorData: AuthorResponse; dateData: string }) {
  return (
    <>
      <a href="profile.html">
        <img src={authorData?.image} />
      </a>
      <div className="info">
        <a href="" className="author">
          {authorData?.username}
        </a>
        <span className="date">{dateData}</span>
      </div>
    </>
  );
}
