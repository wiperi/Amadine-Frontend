import { Quiz, GetQuizListResponse } from '@/types/api';
import { request } from '../utils';
import { AxiosResponse } from 'axios';

export function registerApi(
  email: string,
  password: string,
  nameFirst: string,
  nameLast: string
): Promise<AxiosResponse<{ token: string }>> {
  return request({
    method: 'post',
    url: '/v1/admin/auth/register',
    data: { email, password, nameFirst, nameLast },
  });
}

export function loginApi(
  email: string,
  password: string
): Promise<AxiosResponse<{ token: string }>> {
  return request({
    url: '/v1/admin/auth/login',
    method: 'post',
    data: { email, password },
  });
}

export function userDetailsApi(): Promise<
  AxiosResponse<{
    user: {
      userId: number;
      name: string;
      email: string;
      numSuccessfulLogins: number;
      numFailedPasswordsSinceLastLogin: number;
    };
  }>
> {
  return request({
    url: '/v1/admin/user/details',
    method: 'get',
  });
}

export function getQuizListApi(): Promise<AxiosResponse<GetQuizListResponse>> {
  return request({
    url: '/v1/admin/quiz/list',
    method: 'get',
  });
}

export function getQuizInfoApi(quizId: number): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'get',
  });
}
