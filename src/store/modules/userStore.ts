import { loginApi, registerApi, userDetailsApi } from '@/apis/auth';
import { createQuizApi, deleteQuizApi, getQuizInfoApi, getQuizListApi } from '@/apis/quiz';
import { createSlice, UnknownAction } from '@reduxjs/toolkit';
import { getToken, setToken as _setToken } from '@/utils';
import { Quiz } from '@/types/UserStore';

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
    editingQuiz: null,
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
  },
});

function fetchRegisterApi(email: string, password: string, firstName: string, lastName: string) {
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
      const res = await registerApi(email, password, firstName, lastName);
      await dispatch(setToken(res.data.token));
      const detailsRes = await userDetailsApi();
      await dispatch(setUserInfo(detailsRes.data.user));
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }) as any;
}

function fetchLoginApi(email: string, password: string) {
  return (async (dispatch: any) => {
    try {
      const res = await loginApi(email, password);
      await dispatch(setToken(res.data.token));
      const detailsRes = await userDetailsApi();
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

function fetchQuizzes() {
  return (async (dispatch: any) => {
    try {
      // get quiz id list
      const quizIdListRes = await getQuizListApi();
      const quizIdList = quizIdListRes.data.quizzes.map((quiz) => quiz.quizId);

      // get quiz detail based on quiz id list
      const quizDetailListRes = await Promise.all(
        quizIdList.map((quizId) => getQuizInfoApi(quizId))
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

function fetchCreateQuiz(name: string, description: string) {
  return (async (dispatch: any, getState: any) => {
    try {
      const res = await createQuizApi(name, description);
      const { data: newQuiz } = await getQuizInfoApi(res.data.quizId);
      dispatch(setQuizzes([...getState().user.quizzes, newQuiz]));
      return res.data;
    } catch (error) {
      throw error;
    }
  }) as any;
}

function fetchDeleteQuiz(quizId: number) {
  return (async (dispatch: any, getState: any) => {
    try {
      await deleteQuizApi(quizId);
      dispatch(setQuizzes(getState().user.quizzes.filter((quiz: Quiz) => quiz.quizId !== quizId)));
    } catch (error) {
      throw error;
    }
  }) as any;
}

export const { setToken, setUserInfo, setQuizzes } = userStore.actions;
export { fetchRegisterApi, fetchLoginApi, fetchQuizzes, fetchCreateQuiz, fetchDeleteQuiz };
export default userStore.reducer;
