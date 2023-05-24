import React from "react";
import { IUserDetailUndoButton } from "../../../types/Type";


const UserDetailUndoButton: React.FC<IUserDetailUndoButton> = ({user,updatedUser,setUpdatedUser,buttonActive}) => {
  const undoUser = () => {
    setUpdatedUser({
      id: user.id,
      name: user.name,
      surname: user.surname,
      password: user.password,
      role: user.role,
      createdPerson: user.createdPerson,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
      updatedPerson: user.updatedPerson,
      totalProject: user.totalProject,
    });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={undoUser}
      disabled={buttonActive}
    >
      Undo Changes
    </button>
  );
};

export default UserDetailUndoButton;
