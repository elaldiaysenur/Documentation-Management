import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync } from "../../services/userService";


const initialState: any = {
  users: [],
  userLoggedIn: JSON.parse(String(localStorage.getItem("userLoggedIn"))) !== true && false ? false : JSON.parse(String(localStorage.getItem("userLoggedIn"))),
  adminLoggedIn: JSON.parse(String(localStorage.getItem("adminLoggedIn"))) !== true && false ? false : JSON.parse(String(localStorage.getItem("adminLoggedIn"))),
  activeUser: JSON.parse(String(localStorage.getItem("userLoggedIn"))) === true || JSON.parse(String(localStorage.getItem("adminLoggedIn"))) === true ? JSON.parse(String(localStorage.getItem("activeUser"))) : {},
  usersIsLoading: "loading"
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    setPageControl: (state, action)=>{
      state.pageControl = action.payload;
    },
    setAdminLoggedIn: (state, action) => {
      state.adminLoggedIn = action.payload;
    },
    setActiveUser: (state, action) =>{
      state.activeUser = action.payload;
    },
    setUsers: (state, action)=>{
      state.users = action.payload;
    },
    addNewUser: (state, action)=>{
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.pending, (state, action)=>{
      state.usersIsLoading = "loading";
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersIsLoading = "fulfilled";
    });
  },
});

export default usersSlice.reducer;
export const { setUserLoggedIn, setAdminLoggedIn, setActiveUser, setUsers, addNewUser, setPageControl } = usersSlice.actions;
