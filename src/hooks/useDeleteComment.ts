import { queryClient } from '@src/App';
import { deleteComment } from '@src/apis/comments';

import { useMutation } from 'react-query';

export const useDeleteComment = () => {
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getComments']);
    },
  });
};
