import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mdlContent } from "../types/Type";


export const getContentsAsync: any = createAsyncThunk("contents/getContentsAsync", async (id) => {
  const res = await axios.get(`http://localhost:3004/projects/${id}/contents`);
  return res.data;
}
);

export const getAllContentsAsync: any = createAsyncThunk("allContents/getAllContentsAsync", async () => {
  const res = await axios.get(`http://localhost:3004/contents`);
  return res.data;
}
);

export const addContents = async(updatedContent: mdlContent)=>{
    await axios.post("http://localhost:3004/contents", updatedContent);
  }

  export const deleteContents = async (id: string) => {
    await axios.delete(`http://localhost:3004/contents/${id}`);
  };

  export const updateContents = async (id: string, setUpdatedContent: mdlContent) => {
    await axios.put(`http://localhost:3004/contents/${id}`, setUpdatedContent);
  };
