import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const fetchUser = createAsyncThunk<User, number>(
  'user/fetchUser',
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );

    return response.json();
  },
);

export interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        return { ...state, loading: true, error: null };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return { ...state, loading: false, data: action.payload };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message || 'Error',
        };
      });
  },
});

export default userSlice.reducer;
