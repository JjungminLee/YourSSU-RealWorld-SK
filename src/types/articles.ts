export interface ArticleDto<T> {
  article: T;
}

export type ArticleResponse = {
  articles: ArticlesResponse[];
  articlesCount: number;
};

export type ArticlesResponse = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorResponse;
};

export type AuthorResponse = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type ArticleParams = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};

export type postFavoriteRes = {
  article: ArticlesResponse;
};

export type postFavoriteReq = {
  slug: string;
};

export interface ArticleRequest {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface IEditArticle {
  title: string;
  description: string;
  body: string;
}

export interface IArticleList {
  articles: ArticlesResponse[];
  articleCount: number;
}

export type PostArticleReq = ArticleDto<ArticleRequest>;
export type PostArticleRes = ArticleDto<ArticleResponse>;
export type GetArticleListRes = IArticleList;
export type GetArticleRes = ArticleDto<ArticlesResponse>;
export type PutArticleReq = ArticleDto<IArticleList>;
export type PutArticleRes = ArticleDto<ArticleResponse>;
