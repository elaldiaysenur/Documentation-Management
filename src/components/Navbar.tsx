import React from "react";
import {  NavLink } from "react-router-dom";
import Logout from "../logout/Logout";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { mdlUser } from "../types/Type";
import { dateFilterClear } from "../redux/projects/projectsSlice";

const Navbar: React.FC = () => {
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 mb-5">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse d-flex"
          id="navbarTogglerDemo03"
        >
          
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <>
                  <svg
                    style={{ width: "25px", height: "25px", color: "white" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
                <NavLink className="nav-link navbar-brand" to={"/projects"}>
                  Project Management
                </NavLink>
              </li>
              {activeUser.role === 1 &&  <>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/userpanel"}>
                  User Control Panel
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/projectpanel"}>
                  Project & Content Control Panel
                </NavLink>
              </li>
              </>}
             
            </ul>
         
        </div>
        <div>
          <button
            className="btn btn-primary"
            style={{ cursor: "context-menu", pointerEvents: "none" }}
          >
            Welcome {activeUser.name}
          </button>
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
