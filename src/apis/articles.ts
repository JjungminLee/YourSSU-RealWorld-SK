import { ArticleParams, ArticleResponse, postFavoriteReq, postFavoriteRes } from '@src/types/articles';
import { deleteAsync, getAsync, postAsync } from './common';

export async function getArticles(path: string, params?: ArticleParams, accessToken?: string) {
  const response = await getAsync<ArticleResponse, undefined>(
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

export async function postFavorite({ accessToken, info }: { accessToken: string; info?: postFavoriteReq }) {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await postAsync<postFavoriteRes, postFavoriteReq>(`/articles/${info?.slug}/favorite`, info, {
    headers,
  });
  return response;
}

export async function deleteFavorite({ accessToken, params }: { accessToken: string; params?: postFavoriteReq }) {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await deleteAsync<postFavoriteRes, undefined>(`/articles/${params?.slug}/favorite`, {
    headers,
    params: { ...params },
  });
  return response;
}
