import { usePostComment } from '@src/hooks/usePostComment';
import { userAtom } from '@src/states/UserAtom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function CommentWrite({ accessToken, slug }: { accessToken: string; slug: string }) {
  const [text, setText] = useState<string>('');
  const userData = useRecoilValue(userAtom);
  const { mutate: postComment } = usePostComment();

  return (
    <>
      {userData === null ? (
        <p>
          <a href="/login">Sign in</a> or <a href="/signUp">Sign up</a> to add comments on this article.
        </p>
      ) : (
        <form
          className="card comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            postComment({ accessToken, info: { slug, comment: { body: text } } });
            setText('');
          }}>
          <div className="card-block">
            <textarea
              value={text}
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
              onChange={(e) => {
                e.preventDefault();
                setText(e.target.value);
              }}></textarea>
          </div>
          <div className="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
            <button className="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>
      )}
    </>
  );
}
