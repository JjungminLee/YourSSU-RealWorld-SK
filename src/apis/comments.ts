import { CommentParam, CommentsResponse } from '@src/types/comments';
import { deleteAsync, getAsync } from './common';

export async function getComments(path: string, params?: CommentParam, accessToken?: string) {
  const response = await getAsync<CommentsResponse, undefined>(
    path,
    accessToken
      ? {
          headers: { Authorization: `Token ${accessToken}` },
          params: {
            ...params,
          },
        }
      : {
          params: {
            ...params,
          },
        },
  );
  return response;
}

export async function deleteComment({ accessToken, params }: { accessToken: string; params: CommentParam }) {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await deleteAsync<undefined, undefined>(`/articles/${params?.slug}/comments/${params?.id}`, {
    headers,
    params: { ...params },
  });
  return response;
}
