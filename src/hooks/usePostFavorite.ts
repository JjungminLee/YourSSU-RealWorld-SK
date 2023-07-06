import { queryClient } from '@src/App';
import { postFavorite } from '@src/apis/articles';
import { userAtom } from '@src/states/UserAtom';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

export const usePostFavorite = () => {
  return useMutation(postFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAricles']);
    },
  });
};
