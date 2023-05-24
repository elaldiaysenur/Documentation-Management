import { configureStore } from "@reduxjs/toolkit";

import projectsSlice from "./projects/projectsSlice";
import usersSlice from "./users/usersSlice";
import contentsSlice from "./contents/contentsSlice";


export const store = configureStore({
    reducer: {
        projects: projectsSlice,
        users: usersSlice,
        contents: contentsSlice,
    },
});

//-----------------------------------------
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch