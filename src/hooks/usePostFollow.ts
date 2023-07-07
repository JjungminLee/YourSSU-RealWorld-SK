import { postFollowUser } from '@src/apis/user';
import { useMutation } from 'react-query';
import { queryClient } from '@src/App';

export const usePostFollow = () => {
  return useMutation(postFollowUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['authorProfile']);
    },
  });
};
