export interface IMyArticleProps {
  author: string;
  date: string;
  title: string;
  subTitle: string;
  tagList: [];
}

export default function MyArticleItem({ author, date, title, subTitle, tagList }: IMyArticleProps) {
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <a href="">
            <img src="http://i.imgur.com/Qr71crq.jpg" />
          </a>
          <div className="info">
            <a href={`/profile/${author}`} className="author">
              {author}
            </a>
            <span className="date">{date}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> 29
          </button>
        </div>
        <a href="" className="preview-link">
          <h1>{title}</h1>
          <p>{subTitle}</p>
          <span>Read more...</span>
        </a>
        <ul className="tag-list">
          {tagList.map((item) => (
            <li className="tag-default tag-pill tag-outline">{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
