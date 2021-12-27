import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../api/user.api';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

const userApiClient = new UserApi();

export const userLogin = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const token = await userApiClient.login(payload);
      return token;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    isLoading: false,
  } as IAuth,
  reducers: {
    logout: state => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      let token = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.isLoading = false;
    });

    builder.addCase(userLogin.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoggedIn = false;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: action.payload
      });
    });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export interface IAuth {
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}
