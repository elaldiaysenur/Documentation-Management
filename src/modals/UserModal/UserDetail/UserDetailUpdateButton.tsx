import React from "react";
import { IUserDetailUpdateButton, mdlUser } from "../../../types/Type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateUsers } from "../../../services/userService";
import { setUsers } from "../../../redux/users/usersSlice";



const UserDetailUpdateButton: React.FC<IUserDetailUpdateButton> = ({user,updatedUser,buttonActive,setButtonActive}) => {
  const dispatch = useDispatch();
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const users = useSelector((state: RootState) => state.users.users);

  const updateUser = async (updateUser: mdlUser) => {
    setButtonActive(true);
    const setUpdatedUser = { ...updatedUser };
    setUpdatedUser.updatedDate = new Date();;
    setUpdatedUser.updatedPerson = activeUser.id;
    setUpdatedUser.totalProject = updateUser.totalProject;

    const {
      id,
      name,
      surname,
      password,
      role,
      createdPerson,
      createdDate,
      updatedDate,
      updatedPerson,
    } = setUpdatedUser;

    updateUsers(updateUser.id, setUpdatedUser);
    //api

    const newArr = users.map((users: mdlUser) => {
      if (users.id === updateUser.id) {
        return {
          id,
          name,
          surname,
          password,
          role,
          createdPerson,
          createdDate,
          updatedDate,
          updatedPerson,
          totalProject: updateUser.totalProject,
        };
      }
      return users;
    });
    dispatch(setUsers(newArr));
  };

  return (
    <button
      type="button"
      className="btn btn-warning"
      data-dismiss="modal"
      onClick={() => updateUser(user)}
      disabled={buttonActive}
    >
      Update
    </button>
  );
};

export default UserDetailUpdateButton;
