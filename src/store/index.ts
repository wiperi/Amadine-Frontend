import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterStore';
import userReducer from './modules/userStore';


function saveState(state: any) {
  localStorage.setItem('state', JSON.stringify(state));
}

function loadState() {
  const state = localStorage.getItem('state');
  if (!state) return undefined;

  const parsedState = JSON.parse(state);
  return {
    counter: parsedState.counter,
    user: parsedState.user,
  };
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
