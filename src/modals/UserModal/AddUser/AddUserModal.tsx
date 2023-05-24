import React, { useState } from "react";
import { nanoid } from "nanoid";
import { addUsers } from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addNewUser } from "../../../redux/users/usersSlice";
import {toast} from "react-toastify";
import { mdlUser } from "../../../types/Type";

const AddUserModal: React.FC = () => {
  const dispatch = useDispatch();
  const activeUser: mdlUser = useSelector((state: RootState) => state.users.activeUser);
  const [newUser, setNewUser] = useState<mdlUser>({
    id: "",
    name: "",
    surname: "",
    password: "",
    role: 0,
    totalProject: 0,
    createdDate: new Date(),
    updatedDate: new Date(),
    createdPerson: "emrah",
    updatedPerson: "emrah",
  });

  const addUser = async () => {

    const updatedUser = { ...newUser };
    updatedUser.id = "id"+nanoid();
    updatedUser.createdDate = new Date();
    updatedUser.updatedDate = new Date();
    updatedUser.createdPerson = activeUser.id;
    updatedUser.updatedPerson = activeUser.id;

    // debugger;
    addUsers(updatedUser);
    //api

    dispatch(addNewUser(updatedUser));
    setNewUser({
      id: "",
      name: "",
      surname: "",
      password: "",
      role: 0,
      totalProject: 0,
      createdDate: new Date,
      updatedDate: new Date,
      createdPerson: "",
      updatedPerson: "",
    });
    toast.success("user successfully added");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <form>
                <div style={{marginBottom: "50px", width: "400px", textAlign: "center"}}>
                  <h3>Add User</h3>
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={handleChange}
                    name="name"
                    className="form-control"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Surname</label>
                  <input
                    type="text"
                    value={newUser.surname}
                    onChange={handleChange}
                    name="surname"
                    className="form-control"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                    name="password"
                    className="form-control"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={addUser}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
