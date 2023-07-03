import { usePostFavorite } from '@src/hooks/usePostFavorite';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// 임의로 ? 넣어둠
export default function LikeButton({
  favoritesCount,
  defaultFavorited,
  slug,
  token,
}: {
  favoritesCount: number;
  defaultFavorited: boolean;
  slug: string;
  token?: string;
}) {
  const [favorited, setFavorited] = useState<boolean>(defaultFavorited);
  const { mutate: postLike } = usePostFavorite();

  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        token
          ? (postLike({ accessToken: token, info: { slug } }),
            setFavorited((prevState) => {
              return !prevState;
            }))
          : navigate('/signup');
      }}
      className={`btn ${favorited ? `btn-primary` : `btn-outline-primary`} btn-sm pull-xs-right`}>
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  );
}
