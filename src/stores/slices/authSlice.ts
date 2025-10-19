

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse } from '../../interfaces/Responses/LoginResponse';
import type { UserInfoResponse } from '../../interfaces/Responses/UserInfoResponse';



interface AuthState {
  isAuthenticated: boolean;
  token:LoginResponse | null;
  usuario: UserInfoResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  usuario: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
     login: (
      state,
      action: PayloadAction<{ token: LoginResponse; usuario: UserInfoResponse }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.usuario = null;
      
    },
    updateUsuario: (state, action: PayloadAction<UserInfoResponse>) => {
      state.usuario = action.payload;
    }
  },
 
});

export const { login, logout, updateUsuario } = sessionSlice.actions;
export default sessionSlice.reducer;
