// 임의로 ? 넣어둠
export default function LikeButton({ favoritesCount, favorited }: { favoritesCount: number; favorited?: boolean }) {
  return (
    <button className="btn btn-outline-primary btn-sm pull-xs-right">
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  );
}
