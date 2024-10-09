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
  return (async (dispatch: any) => {
    const res = await registerApi(email, password, firstName, lastName);
    dispatch(setToken(res.data.token));
  }) as any;
};

const fetchLoginApi = (email: string, password: string) => {
  return (async (dispatch: any) => {
    const res = await loginApi(email, password);
    dispatch(setToken(res.data.token));
  }) as any;
};

export const { setToken, setUserInfo } = userStore.actions;
export { fetchRegisterApi, fetchLoginApi };
export default userStore.reducer;
