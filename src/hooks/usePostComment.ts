import { queryClient } from '@src/App';
import { postComment } from '@src/apis/comments';
import { useMutation } from 'react-query';

export const usePostComment = () => {
  return useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getComments']);
    },
  });
};
