import { createSlice } from "@reduxjs/toolkit";
import { getAllContentsAsync, getContentsAsync } from "../../services/contentService";

const initialState: any = {
  contents: [],
  allContents: [],
  contentsIsLoading: "loading",
  allContentsIsLoading: "loading",
};

export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    addNewContent: (state, action)=>{
        state.contents.push(action.payload);
        state.allContents.push(action.payload);
      },
      setContents: (state, action)=>{
        state.contents = action.payload;
      },
      setAllContents: (state, action)=>{
        state.allContents = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder.addCase(getContentsAsync.pending, (state, action)=>{
      state.contentsIsLoading = "loading";
    });
    builder.addCase(getAllContentsAsync.pending, (state, action)=>{
      state.allContentsIsLoading = "loading";
    });
    builder.addCase(getContentsAsync.fulfilled, (state, action) => {
      state.contents = action.payload;
      state.contentsIsLoading = "fulfilled";
    });
    builder.addCase(getAllContentsAsync.fulfilled, (state, action) => {
      state.allContents = action.payload;
      state.allContentsIsLoading = "fulfilled";
    });
  },
});

export default contentsSlice.reducer;
export const {addNewContent, setContents, setAllContents} = contentsSlice.actions;
