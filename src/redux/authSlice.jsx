import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  token: null,
  email: null,
  userIde: null,
 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.userIde = action.payload._id;
  
    },

    logout: (state) => {
      state.name = null;
      state.token = null;
      state.email = null;
      state.userIde = null;
    
      localStorage.clear();
    },
   
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
