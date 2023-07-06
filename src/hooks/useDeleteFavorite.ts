import { queryClient } from '@src/App';
import { deleteFavorite } from '@src/apis/articles';
import { userAtom } from '@src/states/UserAtom';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

export const useDeleteFavorite = () => {
  return useMutation(deleteFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAricles']);
    },
  });
};
