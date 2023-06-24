import {
  PostSignInReq,
  PostSignInRes,
  PostSignUpReq,
  PostSignUpRes,
  PatchUserReq,
  PatchUserRes,
} from '@src/types/user';
import { patchAsync, postAsync } from './common';

export async function postSignUp(info: PostSignUpReq) {
  const response = await postAsync<PostSignUpRes, PostSignUpReq>('/users', info);
  return response.user;
}

export async function postSignIn(info: PostSignInReq) {
  const response = await postAsync<PostSignInRes, PostSignInReq>('/users/login', info);
  return response.user;
}

export async function patchtUserInfo(info: PatchUserReq, accessToken: string) {
  const headers = {
    Authorization: `Token ${accessToken}`,
  };
  const response = await patchAsync<PatchUserRes, PatchUserReq>('/user', info, { headers });
  return response.user;
}
