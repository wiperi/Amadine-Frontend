import { QuizSessionStatusReturned } from '@/types/ApiReturnType';
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

export function quizUpdateName(quizId: number, name: string): Promise<AxiosResponse<Quiz>> {
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

export function questionDelete(
  quizId: number,
  questionId: number
): Promise<AxiosResponse<Record<string, never>>> {
  return request({
    method: 'delete',
    url: `/v1/admin/quiz/${quizId}/question/${questionId}`,
  });
}


export function quizGetTrash(): Promise<
  AxiosResponse<{ quizzes: Pick<Quiz, 'quizId' | 'name'>[] }>
> {
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

export function quizSessionCreate(
  quizId: number,
  autoStartNum: number
): Promise<AxiosResponse<{ sessionId: number }>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/session/start`,
    method: 'post',
    data: { autoStartNum },
  });
}

export function quizUpdateThumbnail(quizId: number, imgUrl: string): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/thumbnail`,
    method: 'put',
    data: { imgUrl },
  });
}

export function quizSessionGetActivity(
  quizId: number
): Promise<AxiosResponse<{ sessions: Array<unknown> }>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/sessions`,
    method: 'get',
  });
}

export function quizSessionUpdateState(
  quizId: number,
  sessionId: number,
  action: string
): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/session/${sessionId}`,
    method: 'put',
    data: { action },
  });
}

export function quizSessionGetStatus(
  quizId: number,
  sessionId: number
): Promise<AxiosResponse<QuizSessionStatusReturned>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/session/${sessionId}`,
    method: 'get',
  });
}

export function quizSessionGetFinalResult(
  quizId: number,
  sessionId: number
): Promise<AxiosResponse<{ results: unknown }>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/session/${sessionId}/results`,
    method: 'get',
  });
}

export function quizSessionGetFinalResultCsvFormat(
  quizId: number,
  sessionId: number
): Promise<AxiosResponse<{ csv: string }>> {
  return request({
    url: `/v1/admin/quiz/${quizId}/session/${sessionId}/results/csv`,
    method: 'get',
  });
}

export function playerJoinSession(
  sessionId: number,
  name: string
): Promise<AxiosResponse<{ playerId: number }>> {
  return request({
    url: '/v1/player/join',
    method: 'post',
    data: { sessionId, name },
  });
}

export function playerGetStatusInSession(
  playerId: number
): Promise<AxiosResponse<{ state: string; numQuestions: number; atQuestion: number }>> {
  return request({
    url: `/v1/player/${playerId}`,
    method: 'get',
  });
}

export function playerGetQuestionInfo(
  playerId: number,
  questionPosition: number
): Promise<
  AxiosResponse<{
    questionId: number;
    question: string;
    duration: number;
    thumbnailUrl: string;
    points: number;
    answers: Pick<
      { answerId: number; answer: string; colour: string },
      'answerId' | 'answer' | 'colour'
    >[];
  }>
> {
  return request({
    url: `/v1/player/${playerId}/question/${questionPosition}`,
    method: 'get',
  });
}

export function playerSubmitAnswer(
  answerIds: Record<string, unknown>,
  playerId: number,
  questionPosition: number
): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/player/${playerId}/question/${questionPosition}/answer`,
    method: 'put',
    data: { answerIds },
  });
}

export function playerGetQuestionResult(
  playerId: number,
  questionPosition: number
): Promise<AxiosResponse<{ results: unknown }>> {
  return request({
    url: `/v1/player/${playerId}/question/${questionPosition}/results`,
    method: 'get',
  });
}

export function playerGetSessionResult(
  playerId: number
): Promise<AxiosResponse<{ results: unknown }>> {
  return request({
    url: `/v1/player/${playerId}/results`,
    method: 'get',
  });
}

export function playerGetMessage(
  playerId: number
): Promise<AxiosResponse<{ messages: unknown[] }>> {
  return request({
    url: `/v1/player/${playerId}/chat`,
    method: 'get',
  });
}

export function playerPostMessage(
  playerId: number,
  message: Record<string, unknown>
): Promise<AxiosResponse<void>> {
  return request({
    url: `/v1/player/${playerId}/chat`,
    method: 'post',
    data: { message },
  });
}
