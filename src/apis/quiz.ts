import { Quiz } from "@/types/UserStore";
import { request } from "@/utils";
import { AxiosResponse } from "axios";

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

export function updateQuizApi(quizId: number, name: string, description: string): Promise<AxiosResponse<Quiz>> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'put',
    data: { name, description },
  });
}

export function deleteQuizApi(quizId: number): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/admin/quiz/${quizId}`,
    method: 'delete',
  });
}

