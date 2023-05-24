import React from "react";
import { setActiveUser, setAdminLoggedIn, setUserLoggedIn } from "../redux/users/usersSlice";
import { useDispatch } from "react-redux";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAdminLoggedIn(false));
    dispatch(setUserLoggedIn(false));
    dispatch(setActiveUser({}));
    localStorage.setItem("userLoggedIn", JSON.stringify(false));
    localStorage.setItem("adminLoggedIn", JSON.stringify(false));
    localStorage.setItem("activeUser", JSON.stringify({}));
  };

  return (
    <button className="btn btn-danger" onClick={handleClick} style={{marginLeft:"1rem"}}>
      Logout
    </button>
  );
};

export default Logout;
