import { configureStore } from '@reduxjs/toolkit';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { todosSlice } from '../features/todos';
import userReducer from '../features/user';

//const rootReducer = combineSlices();

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    filter: filterSlice.reducer,
    currentTodo: currentTodoSlice.reducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
