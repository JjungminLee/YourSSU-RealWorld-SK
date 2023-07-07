import { getComments } from '@src/apis/comments';
import { CommentParam, CommentsResponse } from '@src/types/comments';
import { useQuery } from 'react-query';

export const useGetComments = ({
  path,
  params,
  accessToken,
}: {
  path: string;
  params?: CommentParam;
  accessToken?: string;
}) => {
  return useQuery<CommentsResponse>(
    ['getComments', params, accessToken],
    () => getComments(path, params, accessToken),
    {
      staleTime: 300 * 1000,
      // notifyOnChangeProps: 'tracked',
    },
  );
};
