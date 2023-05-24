import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { mdlUser } from "../types/Type";
import {setUserLoggedIn,setAdminLoggedIn,setActiveUser} from "../redux/users/usersSlice";
import {toast} from "react-toastify";

const LoginUser: React.FC = () => {
  const [rememberButton, setRememberButton] = useState(false)
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState({ name: "", password: "" });
  const users = useSelector((state: RootState) => state.users.users);

  const [error, setError] = useState("");

  const handleClick = () => {

    const newArr = users.map((item: mdlUser) => {
      if(userLogin.name == "")
      {
        setError("Kullancı adı boş bırakılamaz");
        
      }else if (item.name === userLogin.name && item.password === userLogin.password) {
        if (item.role === 0) {
          toast.success("Kullanıcı Girişi Başarılı...");
          dispatch(setUserLoggedIn(true));
          {rememberButton && localStorage.setItem("userLoggedIn", JSON.stringify(true))}
        } else {
          toast.success("Admin Login Successfully!");
          dispatch(setAdminLoggedIn(true));
          {rememberButton && localStorage.setItem("adminLoggedIn", JSON.stringify(true))}
        }
        {rememberButton && localStorage.setItem("activeUser", JSON.stringify(item))}
        dispatch(setActiveUser(item));
      }else{
        setError("Kullanıcı Adı Ya da Şifre Hatalı");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}
    >
      <form className="card shadow-2-strong" style={{ width: "400px", textAlign: "center" }}>
      <div className="card-body p-5 text-center">
        <h3 className="mb-5">Sign in</h3>
        <div className="form-outline mb-4">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={userLogin.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={userLogin.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        {error && <p style={{color: "red"}}>{error}</p>}
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked={rememberButton} onClick={()=>setRememberButton(!rememberButton)} />
        <label className="form-check-label mb-3"> Remember me </label>
        <button
          type="button"
          onClick={handleClick}
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default LoginUser;
