import { createSlice } from "@reduxjs/toolkit";
import { User } from "../Types/User";

interface IAppState {
  isAuthenticated: boolean;
  user: User | null;
  isStaff: boolean;
}

const initialState: IAppState = {
  isAuthenticated: false,
  user: null,
  isStaff: false
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
    },
    setIsStaff: (state, action) => {
      state.isStaff = action.payload;
    }
  }
});

export const { setIsAuthenticated, setUser, setIsStaff } = AppSlice.actions;
export default AppSlice.reducer;