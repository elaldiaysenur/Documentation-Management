import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mdlVisibilityProjects } from "../types/Type";


export const getVisibilityProjectsAsync: any = createAsyncThunk("visibilityProject/getVisibilityProjectAsync", async () => {
    const res = await axios.get("http://localhost:3004/visibilityProjects");
    return res.data;
  }
);

export const addVisibilityProjectsApi = async(addVisibilityProject: any) => {
  await axios.post("http://localhost:3004/visibilityProjects", addVisibilityProject);
};

export const deleteVisibilityProjectsApi = async(id: string) => {
  await axios.delete(`http://localhost:3004/visibilityProjects/${id}`);
};

export const updateVisibilityProjectsApi = async(id: string, updatedVisibilityProject: mdlVisibilityProjects) => {
  await axios.put(`http://localhost:3004/visibilityProjects/${id}`, updatedVisibilityProject);
};

