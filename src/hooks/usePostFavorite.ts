import { postFavorite } from '@src/apis/articles';
import { useMutation } from 'react-query';

export const usePostFavorite = () => {
  return useMutation(postFavorite);
};
