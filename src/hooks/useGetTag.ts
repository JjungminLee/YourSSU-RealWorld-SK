import { getTags } from '@src/apis/tags';
import { TagResponse } from '@src/types/tag';
import { useQuery } from 'react-query';

export const useGetTag = ({ path }: { path: string }) => {
  // const [, setTokenExpire] = useRecoilState(tokenState);
  return useQuery<TagResponse>(['getTag'], () => getTags(path), {
    enabled: true,
  });
};
