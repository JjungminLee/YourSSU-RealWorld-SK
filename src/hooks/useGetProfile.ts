import { getUserProfile } from '@src/apis/user';
import { useQuery } from 'react-query';

export default function useGetProfile(username: string) {
  return useQuery(['authorProfile'], () => getUserProfile(username));
}
