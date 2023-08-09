import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  user: User | null | string;
  error: string | null;
  isLoading: boolean;
  role: string | null;
  
}
interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  role: string;
  phone_number: string;
  full_name: string;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  role: localStorage.getItem("role"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    },
 
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
