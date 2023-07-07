import { queryClient } from '@src/App';
import { postFavorite } from '@src/apis/articles';
import { useMutation } from 'react-query';

export const usePostFavorite = () => {
  return useMutation(postFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAricleDetail']);
      queryClient.invalidateQueries(['getAricles']);
    },
  });
};
