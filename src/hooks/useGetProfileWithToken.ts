import { useQuery } from 'react-query';
import { getUserProfileWithToken } from '@src/apis/user';

export default function useGetProfileWithToken(accessToken: string, username: string) {
  return useQuery(['authorProfileWithToken'], () => getUserProfileWithToken(accessToken, username), {});
}
