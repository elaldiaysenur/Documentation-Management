import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { mdlUser } from "../types/Type";

export const getUsersAsync: any = createAsyncThunk("users/getUsersAsync", async () => {
    const res = await axios.get("http://localhost:3004/users");
    return res.data;
  }
);

export const addUsers = async(updatedUser: mdlUser)=>{
  await axios.post("http://localhost:3004/users", updatedUser);
}

export const deleteUsers = async (id: string) => {
  await axios.delete(`http://localhost:3004/users/${id}`);
};

export const updateUsers = async (id: string, setUpdatedUser: mdlUser) => {
  await axios.put(`http://localhost:3004/users/${id}`, setUpdatedUser);
};


