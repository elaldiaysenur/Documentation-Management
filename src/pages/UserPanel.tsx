import React, { useEffect } from "react";
import AddUser from "../components/UserComponents/UserModalConnection/AddUser";
import UsersList from "../components/UserComponents/UsersList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getUsersAsync } from "../services/userService";
import { getVisibilityProjectsAsync } from "../services/visibilityProjectServise";
import { getProjectsAsync } from "../services/projectService";
import Loading from "../components/Loading";

const UserPanel: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const usersIsLoading = useSelector((state: RootState)=>state.users.usersIsLoading);
  const visibilityProjects = useSelector((state: RootState) => state.projects.visibilityProjects);
  const visibilityProjectsIsLoading = useSelector((state: RootState) => state.projects.visibilityProjectsIsLoading);

  useEffect(() => {
    if (users.length == 0) dispatch(getUsersAsync());
    if (projects.length == 0) dispatch(getProjectsAsync());
    if (visibilityProjects.length == 0) dispatch(getVisibilityProjectsAsync());
  }, [dispatch]);

  return (
    <>
    {usersIsLoading === "loading" || visibilityProjectsIsLoading === "loading"? (
        <Loading />
      ) : (
      <>
        <div className="container d-flex mt-5">
          <AddUser />
        </div>
        <UsersList />
      </>
      )}
    </>
  );
};

export default UserPanel;
