import { createSlice } from "@reduxjs/toolkit";
import { getProjectsAsync } from "../../services/projectService";
import { getVisibilityProjectsAsync } from "../../services/visibilityProjectServise";

const initialState: any = {
  projects: [],
  allProjects: [],
  visibilityProjects: [],
  allVisibilityProjects: [],
  projectsIsLoading: "loading",
  visibilityProjectsIsLoading: "loading",
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addNewProject: (state, action)=>{
      state.projects.push(action.payload);
      state.allProjects.push(action.payload);
    },
    setProjects: (state, action)=>{
      state.projects = action.payload;
    },
    setAllProjects: (state, action)=>{
      state.allProjects = action.payload;
    },
    dateFilterClear: (state)=>{
      state.projects = state.allProjects;
      state.visibilityProjects = state.allVisibilityProjects;
    },
    addVisibilityProjects: (state, action)=>{
      state.visibilityProjects.push(action.payload);
    },
    setVisibilityProjects: (state, action)=>{
      state.visibilityProjects = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsAsync.pending, (state, action)=>{
      state.projectsIsLoading = "loading";
    });
    builder.addCase(getVisibilityProjectsAsync.pending, (state, action)=>{
      state.visibilityProjectsIsLoading = "loading";
    });
    builder.addCase(getProjectsAsync.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.allProjects = action.payload;
      state.projectsIsLoading = "fulfilled";
    });
    builder.addCase(getVisibilityProjectsAsync.fulfilled, (state, action)=>{
      state.visibilityProjects = action.payload;
      state.allVisibilityProjects = action.payload;
      state.visibilityProjectsIsLoading = "fulfilled";
    })
  },
});

export default projectsSlice.reducer;
export const { addNewProject, setProjects, setAllProjects,addVisibilityProjects, setVisibilityProjects, dateFilterClear } = projectsSlice.actions;
