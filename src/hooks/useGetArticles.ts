import { getArticles } from '@src/apis/articles';
import { ArticleParams, ArticleResponse } from '@src/types/articles';
import { useQuery } from 'react-query';

export const useGetArticles = ({
  path,
  params,
  accessToken,
}: {
  path: string;
  params?: ArticleParams;
  accessToken?: string;
}) => {
  return useQuery<ArticleResponse>(['getAricles', params, accessToken], () => getArticles(path, params, accessToken), {
    staleTime: 300 * 1000,
    notifyOnChangeProps: 'tracked',
  });
};
