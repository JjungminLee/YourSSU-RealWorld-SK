import { getArticles } from '@src/apis/articles';
import { ArticleResponse } from '@src/types/articles';
import { useQuery } from 'react-query';

export const useGetArticles = ({
  path,
  params,
}: {
  path: string;
  params?: { tag: string; author: string; favorited: string; limit: number; offset: number };
}) => {
  // const [, setTokenExpire] = useRecoilState(tokenState);
  return useQuery<ArticleResponse>(['getAricles'], () => getArticles(path, { params: params }), {
    enabled: true,
  });
};
