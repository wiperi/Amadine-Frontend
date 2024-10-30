import { Quiz } from '@/types/UserStore';
import { request } from '@/utils';
import { AxiosResponse } from 'axios';

export function quizList(): Promise<
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

export function quizInfo(quizId: number): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'get',
  });
}

export function quizCreate(name: string, description: string): Promise<AxiosResponse<Quiz>> {
  return request({
    url: '/v1/admin/quiz',
    method: 'post',
    data: { name, description },
  });
}

export function quizUpdateName(
  quizId: number,
  name: string
): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/name`,
    method: 'put',
    data: { name },
  });
}
export function quizUpdateDescription(
  quizId: number,
  description: string
): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/description`,
    method: 'put',
    data: { description },
  });
}

export function quizDelete(quizId: number): Promise<AxiosResponse<void>> {
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

export function questionCreate(
  quizId: number,
  questionBody: QuestionBody
): Promise<AxiosResponse<{ questionId: number }>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/question`,
    method: 'post',
    data: { questionBody },
  });
}

export function questionUpdate(
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

export function quizGetTrash(): Promise<AxiosResponse<{ quizzes: Pick<Quiz, 'quizId' | 'name'>[] }>> {
  return request({
    url: '/v1/admin/quiz/trash',
    method: 'get',
  });
}

export function trashEmpty(quizIds: number[]): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/admin/quiz/trash/empty?quizIds=[${quizIds.join(',')}]`,
    method: 'delete',
  });
}

export function quizRestore(quizId: number): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/restore`,
    method: 'post',
  });
}

