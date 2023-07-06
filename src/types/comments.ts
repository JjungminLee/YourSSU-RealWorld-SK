import { AuthorResponse } from './articles';

export type CommentParam = {
  slug: string;
  id?: number;
};

export type CommentsResponse = {
  comments: CommentResponse[];
};

export type CommentResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorResponse;
};

export type PostCommentResponse = {
  comment: CommentResponse;
};

export type PostCommentRequest = {
  slug: string;
  comment: {
    body: string;
  };
};
