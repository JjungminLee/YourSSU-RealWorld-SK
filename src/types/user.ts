export interface UserDto<T> {
  user: T;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp {
  username: string;
  email: string;
  password: string;
}

export interface IGetUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface IUserInfo {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export type PostSignUpRes = UserDto<IGetUser>;
export type PostSignUpReq = UserDto<ISignUp>;
export type PostSignInReq = UserDto<ILogin>;
export type PostSignInRes = UserDto<IGetUser>;
export type PatchUserReq = UserDto<IUserInfo>;
export type PatchUserRes = UserDto<IGetUser>;
