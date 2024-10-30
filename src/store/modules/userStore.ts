import { userLogin, userRegister, userDetails } from '@/apis/auth';
import {
  quizCreate,
  questionCreate,
  quizDelete,
  trashEmpty,
  quizInfo,
  quizList,
  quizGetTrash,
  quizRestore,
  quizUpdateDescription,
  quizUpdateName,
  questionUpdate,
} from '@/apis/quiz';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { getToken, setToken as _setToken } from '@/utils';
import { Question, Quiz } from '@/types/UserStore';
import { RootState } from '..';

const userStore = createSlice({
  name: 'user',

  initialState: {
    token: getToken() || '',
    userInfo: {
      userId: 0,
      name: '',
      email: '',
      numSuccessfulLogins: 0,
      numFailedPasswordsSinceLastLogin: 0,
    },
    quizzes: [
      {
        quizId: 5546,
        name: 'This is the name of the quiz',
        timeCreated: 1683019484,
        timeLastEdited: 1683019484,
        description: 'This quiz is so we can have a lot of fun',
        numQuestions: 1,
        questions: [
          {
            questionId: 5546,
            question: 'Who is the Monarch of England?',
            duration: 4,
            points: 5,
            answers: [
              {
                answerId: 2384,
                answer: 'Prince Charles',
                colour: 'red',
                correct: true,
              },
            ],
          },
        ],
        duration: 44,
      },
    ],
    editingQuiz: {
      quizId: 0,
      name: '',
      timeCreated: 0,
      timeLastEdited: 0,
      description: '',
      numQuestions: 0,
      questions: [
        {
          questionId: 0,
          question: '',
          duration: 0,
          points: 0,
          answers: [],
        },
      ],
    },
    trashQuizzes: [
      {
        quizId: 0,
        name: 'Deleted Quiz',
      },
    ],
  },

  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // token persistance
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setQuizzes(state, action) {
      state.quizzes = action.payload;
    },
    setEditingQuiz(state, action) {
      state.editingQuiz = action.payload;
    },
    setEditingAnswers(state, action) {
      const questionId = action.payload.questionId;
      const newAnswers = action.payload.answers;
      state.editingQuiz.questions.find((q: Question) => q.questionId === questionId)!.answers =
        newAnswers;
    },
    setEditingQuestions(state, action) {
      const newQuestions = action.payload.questions;
      state.editingQuiz.questions = newQuestions;
    },
    setTrashQuizzes(state, action) {
      state.trashQuizzes = action.payload;
    },
  },
});

export function fetchRegisterApi(email: string, password: string, firstName: string, lastName: string) {
  /**
   * This is outer function.
   *
   * Redux use a middleware called redux-thunk to handle async actions.
   * When dispatch() receives an function instead of an action, the middleware will handle it first.
   * The redux-thunk middleware will call the inner function with dispatch as the argument.
   *
   * The return value of the inner function will be returned as the result of the thunk(outer function).
   */

  return (async (dispatch: any) => {
    /**
     * This is inner function.
     *
     * The inner function is an async function.
     * It will implicitly return a promise.
     */

    try {
      const res = await userRegister(email, password, firstName, lastName);
      await dispatch(setToken(res.data.token));
      const detailsRes = await userDetails();
      await dispatch(setUserInfo(detailsRes.data.user));
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }) as any;
}

export function fetchLoginApi(email: string, password: string) {
  return (async (dispatch: any) => {
    try {
      const res = await userLogin(email, password);
      await dispatch(setToken(res.data.token));
      const detailsRes = await userDetails();
      await dispatch(setUserInfo(detailsRes.data.user));
      return res.data;
    } catch (error: any) {
      /**
       * For a async function, the return value will be wrapped in a fulfilled promise.
       * Any thrown value will be wrapped in a rejected promise. Also, return a rejected promise directly will have the same effect.
       */
      throw error;
    }
  }) as any;
}

export function fetchQuizzes() {
  return (async (dispatch: any) => {
    try {
      // get quiz id list
      const quizIdListRes = await quizList();
      const quizIdList = quizIdListRes.data.quizzes.map((quiz) => quiz.quizId);

      // get quiz detail based on quiz id list
      const quizDetailListRes = await Promise.all(
        quizIdList.map((quizId) => quizInfo(quizId))
      );

      // assemble the quizzes details
      const quizDetailList = quizDetailListRes.map((res) => res.data);

      // dispatch the action to set the quizzes
      dispatch(setQuizzes(quizDetailList));

      // Return the quiz details for potential further use
      return quizDetailList;
    } catch (error) {
      throw error;
    }
  }) as any;
}

export function fetchCreateQuiz(name: string, description: string) {
  return (async (dispatch: any, getState: any) => {
    try {
      // create quiz
      const res = await quizCreate(name, description);

      // create questions
      const editingQuestions: Question[] = getState().user.editingQuiz.questions;
      for (const q of editingQuestions) {
        const questionBody = {
          question: q.question,
          duration: q.duration,
          points: q.points,
          answers: q.answers.map((a) => ({ answer: a.answer, correct: a.correct })),
        };
        await questionCreate(res.data.quizId, questionBody);
      }

      const { data: newQuiz } = await quizInfo(res.data.quizId);
      dispatch(setQuizzes([...getState().user.quizzes, newQuiz]));
      return res.data;
    } catch (error) {
      throw error;
    }
  }) as any;
}

export function fetchEditQuiz(quizId: number, name: string, description: string) {
  return (async (dispatch: any, getState: any) => {
    try {
      // change quiz name and description
      await quizUpdateName(quizId, name);
      await quizUpdateDescription(quizId, description);

      // change questions
      const editingQuestions: Question[] = getState().user.editingQuiz.questions;
      for (const q of editingQuestions) {
        const questionBody = {
          question: q.question,
          duration: q.duration,
          points: q.points,
          answers: q.answers.map((a) => ({ answer: a.answer, correct: a.correct })),
        };
        await questionUpdate(quizId, q.questionId, questionBody);
      }

      const { data: newQuiz } = await quizInfo(quizId);
      dispatch(
        setQuizzes(
          getState().user.quizzes.map((quiz: Quiz) => (quiz.quizId === quizId ? newQuiz : quiz))
        )
      );
      return newQuiz;
    } catch (error) {
      throw error;
    }
  }) as any;
}

export function fetchDeleteQuiz(quizId: number) {
  return (async (dispatch: any, getState: any) => {
    try {
      await quizDelete(quizId);
      dispatch(setQuizzes(getState().user.quizzes.filter((quiz: Quiz) => quiz.quizId !== quizId)));
    } catch (error) {
      throw error;
    }
  }) as any;
}

export function fetchTrashQuizzes() {
  return (async (dispatch: any) => {
    try {
      const res = await quizGetTrash();
      dispatch(setTrashQuizzes(res.data.quizzes));
    } catch (error) {
      throw error;
    }
  }) as any;
}

export function fetchEmptyTrash(quizIds: number[]) {
  return (async (dispatch: any) => {
    await trashEmpty(quizIds);
    dispatch(setTrashQuizzes([]));
  }) as any;
}

export function fetchRestoreQuiz(quizIds: number[]) {
  return (async (dispatch: Dispatch, getState: () => RootState) => {
    await Promise.all(quizIds.map(async (quizId) => quizRestore(quizId)));
    // remove from trash
    quizIds.forEach((quizId) => {
      dispatch(setTrashQuizzes(getState().user.trashQuizzes.filter((quiz) => quiz.quizId !== quizId)));
    });
  }) as any;
}

export const {
  setToken,
  setUserInfo,
  setQuizzes,
  setEditingQuiz,
  setEditingAnswers,
  setEditingQuestions,
  setTrashQuizzes,
} = userStore.actions;
export default userStore.reducer;
