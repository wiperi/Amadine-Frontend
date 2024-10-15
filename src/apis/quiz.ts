import { Quiz } from '@/types/UserStore';
import { request } from '@/utils';
import { AxiosResponse } from 'axios';

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

export function getQuizInfoApi(quizId: number): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'get',
  });
}

export function createQuizApi(name: string, description: string): Promise<AxiosResponse<Quiz>> {
  return request({
    url: '/v1/admin/quiz',
    method: 'post',
    data: { name, description },
  });
}

export function updateQuizNameApi(
  quizId: number,
  name: string
): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/name`,
    method: 'put',
    data: { name },
  });
}
export function updateQuizDescriptionApi(
  quizId: number,
  description: string
): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/description`,
    method: 'put',
    data: { description },
  });
}

export function deleteQuizApi(quizId: number): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'delete',
  });
}

type QuestionBody = {
  question: string;
  duration: number;
  points: number;
  answers: Array<{
    answer: string;
    correct: boolean;
  }>;
};

export function createQuizQuestionApi(
  quizId: number,
  questionBody: QuestionBody
): Promise<AxiosResponse<{ questionId: number }>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/question`,
    method: 'post',
    data: { questionBody },
  });
}

export function updateQuizQuestionApi(
  quizId: number,
  questionId: number,
  questionBody: QuestionBody
): Promise<AxiosResponse<Record<string, never>>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/question/${questionId}`,
    method: 'put',
    data: { questionBody },
  });
}
