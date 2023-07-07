import { useDeleteFavorite } from '@src/hooks/useDeleteFavorite';
import { usePostFavorite } from '@src/hooks/usePostFavorite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

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
  const [favorited, setFavorited] = useState<boolean | null>(defaultFavorited);

  const { mutate: postLike } = usePostFavorite();
  const { mutate: deleteUnlike } = useDeleteFavorite();

  const navigate = useNavigate();
  useEffect(() => {
    setFavorited(defaultFavorited);
  }, [defaultFavorited]);

  return (
    <button
      onClick={() => {
        token
          ? (!favorited
              ? postLike({ accessToken: token, info: { slug } })
              : deleteUnlike({ accessToken: token, params: { slug } }),
            setFavorited(null))
          : navigate('/signup');
      }}
      className={`btn btn-sm ${favorited === null ? `disabled` : favorited ? `btn-primary` : `btn-outline-primary`}`}>
      <i className="ion-heart"></i>
      &nbsp; Favorite Article <span className="counter">({favoritesCount})</span>
    </button>
  );
}
