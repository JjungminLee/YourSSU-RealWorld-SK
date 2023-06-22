export interface UserResponseDto<T> {
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

export type PostSignUpRes = UserResponseDto<IGetUser>;
export type PostSignUpReq = ISignUp;
export type PostSignInReq = ILogin;
export type PostSignInRes = UserResponseDto<IGetUser>;
