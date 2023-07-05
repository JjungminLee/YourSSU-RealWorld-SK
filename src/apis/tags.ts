import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './common';

/**
 * GET 요청을 보내는 API 호출 함수
 * @param T 서버 응답 타입
 * @param D parameter 또는 body로 전달할 데이터의 타입
 *
 * @param path API Endpoint
 * @param config `AxiosRequestConfig`
 * @param errorMessages status code에 따른 에러 메시지
 */
export async function getTags<TagResponse, ResponseDto>(
  path: string,
  config?: AxiosRequestConfig<ResponseDto>,
  errorMessages?: Record<number, string>,
): Promise<TagResponse> {
  try {
    const response = await axios.get<TagResponse, AxiosResponse<TagResponse, ResponseDto>, ResponseDto>(path, {
      baseURL: apiUrl,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error) {
    // return을 쓰면 resolve가 됨
    throw processError(error, errorMessages);
  }
}
