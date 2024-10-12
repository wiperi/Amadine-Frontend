import { request } from '../utils';
import { AxiosResponse } from 'axios';

export function registerApi(email: string, password: string, nameFirst: string, nameLast: string): Promise<AxiosResponse<{ token: string }>> {
  return request({
    method: 'post',
    url: '/v1/admin/auth/register',
    data: { email, password, nameFirst, nameLast },
  });
}

export function loginApi(email: string, password: string): Promise<AxiosResponse<{ token: string }>> {
  return request({
    url: '/v1/admin/auth/login',
    method: 'post',
    data: { email, password },
  });
}

export function userDetailsApi(): Promise<AxiosResponse<{
  user: {
    userId: number;
    name: string;
    email: string;
    numSuccessfulLogins: number;
    numFailedPasswordsSinceLastLogin: number;
  };
}>> {
  return request({
    url: '/v1/admin/user/details',
    method: 'get',
  });
}

export function getQuizListApi(): Promise<
  AxiosResponse<{
    quizzes: Array<{
      quizId: number;
      name: string;
    }>;
  }>
> {
  return request({
    url: '/v1/admin/quiz/list',
    method: 'get',
  });
}

export function getQuizInfoApi(quizId: number): Promise<
  AxiosResponse<{
    quiz: {
      quizId: number;
      name: string;
      timeCreated: number;
      timeLastEdited: number;
      description: string;
      numQuestions: number;
      questions: Array<{
        questionId: number;
        question: string;
        duration: number;
        points: number;
        answers: Array<{
          answerId: number;
          answer: string;
          colour: string;
          correct: boolean;
        }>;
      }>;
      duration: number;
    };
  }>
> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'get',
  });
}
