import { getArticleDetail } from '@src/apis/articles';
import { ArticlesResponse } from '@src/types/articles';
import { useQuery } from 'react-query';

export const useGetArticleDetail = ({ value, accessToken }: { value: string; accessToken?: string }) => {
  return useQuery<ArticlesResponse>(
    ['getAricleDetail', value, accessToken],
    () => getArticleDetail(value, accessToken),
    {
      staleTime: 300 * 1000,
    },
  );
};
