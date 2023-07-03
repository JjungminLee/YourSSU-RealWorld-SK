import { getArticles } from '@src/apis/articles';
import { ArticleParams, ArticleResponse } from '@src/types/articles';
import { useQuery } from 'react-query';

export const useGetArticles = ({ path, params }: { path: string; params?: ArticleParams }) => {
  // const [, setTokenExpire] = useRecoilState(tokenState);
  return useQuery<ArticleResponse>(['getAricles', params], () => getArticles(path, params), {
    // enabled: true,
    staleTime: 60 * 1000,
  });
};
