import { useDeleteComment } from '@src/hooks/useDeleteComment';
import { CommentResponse } from '@src/types/comments';
import { dateFormat } from '@src/utils/dateFormat';

export default function Comment({ data, token, slug }: { data: CommentResponse; token: string; slug: string }) {
  const { mutate: deleteComment } = useDeleteComment();
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{data?.body}</p>
      </div>
      <div className="card-footer">
        <a href="" className="comment-author">
          <img src={data.author.image} className="comment-author-img" />
        </a>
        &nbsp;
        <a href={`/profile/${data.author.username}`} className="comment-author">
          {data.author.username}
        </a>
        <span className="date-posted">{dateFormat(data?.createdAt)}</span>
        <span
          className="mod-options"
          onClick={() => {
            deleteComment({ accessToken: token, params: { id: data.id, slug } });
          }}>
          <i className="ion-trash-a" />
        </span>
      </div>
    </div>
  );
}
