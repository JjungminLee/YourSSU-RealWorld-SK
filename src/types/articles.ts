export interface ArticleDTO<T> {
  articles: T;
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

export type ArticleParams = { tag?: string; author?: string; favorited?: string; limit?: number; offset?: number };

// export type GetAricleRes = ArticleDTO<ArticleResponse>;
