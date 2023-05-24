import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersAsync } from "../services/userService";
import { RootState } from "../redux/store";
import LoginUser from "../pages/LoginUser";
import { Navigate } from "react-router";

const LoginControl: React.FC = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state: RootState) => state.users.userLoggedIn);
  const adminLoggedIn = useSelector((state: RootState) => state.users.adminLoggedIn);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);


  if(userLoggedIn || adminLoggedIn)
  {
    return <Navigate to="/projects" replace></Navigate>
  }else{
    return <LoginUser />
  }
};

export default LoginControl;
