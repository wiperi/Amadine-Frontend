import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: '',
    userInfo: {
      name: '',
      email: '',
    }
  },
  // 同步修改方法
  reducers: {
  }
})
