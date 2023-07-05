import { getAsync } from './common';
import { TagResponse } from '@src/types/tag';

export async function getTags(path: string) {
  const response = await getAsync<TagResponse, undefined>(path);
  return response;
}
