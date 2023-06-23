import { GetUserRes, PostSignInReq, PostSignInRes, PostSignUpReq, PostSignUpRes } from '@src/types/user';
import { getAsync, postAsync } from './common';

export async function postSignUp(info: PostSignUpReq) {
  const response = await postAsync<PostSignUpRes, PostSignUpReq>('/users', info);
  return response.user;
}

export async function postSignIn(info: PostSignInReq) {
  const response = await postAsync<PostSignInRes, PostSignInReq>('/users/login', info);
  return response.user;
}
