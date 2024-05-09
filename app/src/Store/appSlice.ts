import { createSlice } from "@reduxjs/toolkit";
import { User } from "../Types/User";

interface IAppState {
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: IAppState = {
  isAuthenticated: false,
  user: null
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setIsAuthenticated, setUser } = AppSlice.actions;
export default AppSlice.reducer;