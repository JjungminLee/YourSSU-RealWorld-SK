import { getUserProfile } from '@src/apis/user';
import { useQuery } from 'react-query';
import { GetProfileRes } from '@src/types/user';

export default function useGetProfile(username: string) {
  return useQuery(['authorProfile'], () => getUserProfile(username), {
    staleTime: 30000,
  });
}
