import { deleteFollowUser } from '@src/apis/user';
import { useMutation } from 'react-query';
import { queryClient } from '@src/App';

export const usePostUnfollow = () => {
  return useMutation(deleteFollowUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['postFollow']);
    },
  });
};
