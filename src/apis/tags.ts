import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './common';
import { ResponseDto } from '@src/types/common';
import { TagResponse } from '../types/tag';

const apiUrl = 'https://api.realworld.io/api';

function processError(error: unknown, errorMessages?: Record<number, string>): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 요청 전송 성공, 서버 응답 성공, 그러나 상태 코드가 2xx 이외
      return {
        statusCode: error.response.status,
        errorMessage: errorMessages?.[error.response.status] ?? '문제가 발생했어요. 다시 시도하거나 문의해 주세요.',
        info: error.response.data,
      };
    }

    if (error.request) {
      // 요청 전송 성공, 그러나 서버 응답 없음
      return {
        statusCode: -1,
        errorMessage: '서버와 연결하지 못했어요. 인터넷 연결 상태를 확인하고 다시 시도해 주세요.',
        info: error.request,
      };
    }
  }

  // 케이스 분류 실패
  return {
    statusCode: -1,
    errorMessage: '문제가 발생했어요. 다시 시도하거나 문의해 주세요.',
    info: error,
  };
}

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
      baseURL: `${apiUrl}/${path}`,
      responseType: 'json',
      ...config,
    });

    return response.data;
  } catch (error) {
    // return을 쓰면 resolve가 됨
    throw processError(error, errorMessages);
  }
}
