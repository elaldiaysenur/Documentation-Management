import React from "react";
import DeleteUser from "./DeleteUser";
import { IUserProp, mdlVisibilityProjects } from "../../types/Type";
import OnUserProjectsModal from "../../modals/UserModal/OnUser/OnUserProjectsModal";
import AddOnUserProjectsModal from "../../modals/UserModal/OnUser/AddOnUserProjectsModal";
import UserDetailModal from "../../modals/UserModal/UserDetail/UserDetailModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const User: React.FC<IUserProp> = ({ user }) => {
  const visibilityProjects = useSelector(
    (state: RootState) => state.projects.visibilityProjects
  );

  const onUserProjectLength = () => {
    return visibilityProjects.filter(
      (item: mdlVisibilityProjects) => item.userId == user.id
    ).length;
  };

  return (
    <>
      <tr style={{textAlign: "center"}}>
        <td scope="row">{user.id.substring(0, 6)}</td>
        <td scope="row">{user.name}</td>
        <td scope="row">{user.surname}</td>
        <td scope="row">{user.password}</td>
        <td scope="row">{user.role}</td>
        <td scope="row">{onUserProjectLength()}</td>
        <td>{(new Date(user.createdDate)).toLocaleDateString()  +"  "+ (new Date(user.createdDate)).toLocaleTimeString()}</td>
        <td>{(new Date(user.updatedDate)).toLocaleDateString()  +"  "+ (new Date(user.updatedDate)).toLocaleTimeString()}</td>
        <td scope="row">{user.createdPerson.substring(0, 6)}</td>
        <td scope="row">{user.updatedPerson.substring(0, 6)}</td>
        <td scope="row" style={{ display: "flex", flexDirection: "column" }}>
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Options
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                type="button"
                className="btn btn-success w-100 dropdown-item"
                data-toggle="modal"
                data-target={`#${user.id}` + "on"}
              >
                Projects
              </button>
              <button
                type="button"
                className="btn btn-outline-success w-100 dropdown-item"
                data-toggle="modal"
                data-target={`#${user.id}` + "add"}
              >
                Add Project
              </button>
              <button
                type="button"
                className="btn btn-warning w-100 dropdown-item"
                data-toggle="modal"
                data-target={`#${user.id}`}
              >
                Detail
              </button>
              <DeleteUser user={user} />
            </div>
          </div>

          <OnUserProjectsModal user={user} />
          <AddOnUserProjectsModal user={user} />
          <UserDetailModal user={user} />
        </td>
      </tr>
    </>
  );
};

export default User;
