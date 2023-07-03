import { queryClient } from '@src/App';
import { deleteFavorite } from '@src/apis/articles';
import { useMutation } from 'react-query';

export const useDeleteFavorite = () => {
  return useMutation(deleteFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAricles');
    },
  });
};
