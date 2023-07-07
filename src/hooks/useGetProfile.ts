import { getUserProfile } from '@src/apis/user';
import { useQuery } from 'react-query';
import { GetProfileRes } from '@src/types/user';

export default function useGetProfile(accessToken: string, username: string) {
  return useQuery(['authorProfile'], () => getUserProfile(accessToken, username), {
    staleTime: 30000,
  });
}
