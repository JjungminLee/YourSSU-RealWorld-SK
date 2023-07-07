import {
  ArticleParams,
  ArticleResponse,
  GetArticleListRes,
  GetArticleRes,
  PutArticleReq,
  PutArticleRes,
  postFavoriteReq,
  postFavoriteRes,
} from '.././types/articles';
import { deleteAsync, getAsync, patchAsync, postAsync } from './common';
import { PostArticleReq, PostArticleRes } from '.././types/articles';

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

export async function postArticle(accessToken: string | undefined, info?: PostArticleReq) {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await postAsync<PostArticleRes, PostArticleReq>('/articles', info, { headers });
  return response.article;
}

export const getUserArticle = async (username: string, accessToken: string) => {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await getAsync<GetArticleListRes, undefined>(`/articles?author=${username}`, { headers });
  return response.articles;
};

export const getArticleDetail = async (slug: string) => {
  console.log(slug);
  const headers = {
    accept: 'application/json',
  };
  const response = await getAsync<GetArticleRes, undefined>(`/articles/${slug}`, { headers });
  console.log(response);

  return response.article;
};

export const putArticleDetail = async (accessToken: string, slug: string, info: PutArticleReq) => {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await patchAsync<PutArticleRes, PutArticleReq>(`/articles/${slug}`, info, { headers });
  return response.article;
};

export const deleteArticleDetail = async (accessToken: string, slug: string) => {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await deleteAsync<{}, any>(`/articles/${slug}`, { headers });
  return response;
};
