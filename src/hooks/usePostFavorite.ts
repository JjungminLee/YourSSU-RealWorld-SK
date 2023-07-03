import { queryClient } from '@src/App';
import { postFavorite } from '@src/apis/articles';
import { userAtom } from '@src/states/UserAtom';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

// const queryClient = useQueryClient();
// const userData = useRecoilValue(userAtom);

export const usePostFavorite = () => {
  return useMutation(postFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAricles');
    },
  });
};
