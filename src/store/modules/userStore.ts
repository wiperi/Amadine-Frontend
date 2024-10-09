import { loginApi, registerApi } from '@/apis/auth';
import { createSlice } from '@reduxjs/toolkit';
import { getToken, setToken as _setToken } from '@/utils';

const userStore = createSlice({
  name: 'user',

  initialState: {
    token: localStorage.getItem('token') || '',
    userInfo: {
      nameFirst: '',
      nameLast: '',
      email: '',
    },
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
  },
});

const fetchRegisterApi = (email: string, password: string, firstName: string, lastName: string) => {
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
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }) as any;
};

const fetchLoginApi = (email: string, password: string) => {
  return (async (dispatch: any) => {
    try {
      const res = await loginApi(email, password);
      await dispatch(setToken(res.data.token));
      return res.data;
    } catch (error: any) {
      /**
       * For a async function, the return value will be wrapped in a fulfilled promise.
       * Any thrown value will be wrapped in a rejected promise. Also, return a rejected promise directly will have the same effect.
       */
      throw error;
    }
  }) as any;
};

export const { setToken, setUserInfo } = userStore.actions;
export { fetchRegisterApi, fetchLoginApi };
export default userStore.reducer;
