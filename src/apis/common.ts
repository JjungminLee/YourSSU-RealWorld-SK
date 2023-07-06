import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiUrl = 'https://api.realworld.io/api';

/*
[[ API 타입 & 유틸 함수 ]]
*/

/**
 * API 호출 함수에서 발생하는 에러 타입
 * @param T info의 타입
 */
export class ApiError extends Error {
  error: unknown;
  errorMessage: any;
  info?: any;

  constructor(error: Error, errorMessage: any, info?: any) {
    super(errorMessage);
    this.error = error;
    this.errorMessage = error.message;
    this.info = info;
  }
}

/**
 * API 호출 함수의 반환 타입
 * @param T 호출에 성공하면 가져오는 데이터의 타입
 */

/**
 * API 호출 함수의 에러를 받아 클라이언트의 에러 형식으로 가공하는 함수
 * @param error 처리할 에러
 * @param getErrorMessage status code에 따라 에러 메시지를 결정하는 함수
 */
function processError(error: any, errorMessages?: Record<number, string>): ApiError {
  return new ApiError(error, error.response.data.errors);
}

/*
[[ API 호출 함수 ]]
*/

/**
 * GET 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function getAsync<T, D>(
  path: string,
  config?: AxiosRequestConfig<D>,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const response = await axios.get<T, AxiosResponse<T, D>, D>(path, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error: unknown) {
    throw processError(error, errorMessages);
  }
}

/**
 * POST 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param data body로 전달할 데이터
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function postAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const response = await axios.post<T, AxiosResponse<T, D>, D>(path, data, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });
    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}

/**
 * DELETE 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function deleteAsync<T, D>(
  path: string,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const response = await axios.delete<T, AxiosResponse<T, D>, D>(path, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}

/**
 * PATCH 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function patchAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessages?: Record<number, string>,
): Promise<T> {
  try {
    const response = await axios.put<T, AxiosResponse<T, D>, D>(path, data, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error) {
    throw processError(error, errorMessages);
  }
}
