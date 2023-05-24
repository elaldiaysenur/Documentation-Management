import React, { useState, useEffect } from "react";
import { IUserProp, mdlUser } from "../../../types/Type";
import UserDetailUndoButton from "./UserDetailUndoButton";
import UserDetailUpdateButton from "./UserDetailUpdateButton";

const UserDetailModal: React.FC<IUserProp> = ({ user }) => {
  const [buttonActive, setButtonActive] = useState(true);
  const [updatedUser, setUpdatedUser] = useState<mdlUser>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    if (e.target.name === "role") {
      setUpdatedUser({ ...updatedUser, role: Number(e.target.value) });
    }
  };

  useEffect(() => {
    if (JSON.stringify(updatedUser) == JSON.stringify(user)) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [updatedUser]);

  return (
    <div
      className="modal fade"
      id={user.id}
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
                <div
                  style={{
                    marginBottom: "25px",
                    width: "400px",
                    textAlign: "center",
                  }}
                >
                  <h3>Update User</h3>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Name</label>
                  <input
                    type="text"
                    value={updatedUser.name}
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Surname</label>
                  <input
                    type="text"
                    value={updatedUser.surname}
                    name="surname"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="text"
                    value={updatedUser.password}
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInputRole1">Role</label>
                  <input
                    type="text"
                    value={updatedUser.role}
                    name="role"
                    className="form-control"
                    onChange={handleChange}
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
            <UserDetailUndoButton
              user={user}
              updatedUser={updatedUser}
              setUpdatedUser={setUpdatedUser}
              buttonActive={buttonActive}
            />
            <UserDetailUpdateButton
              user={user}
              buttonActive={buttonActive}
              setButtonActive={setButtonActive}
              updatedUser={updatedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
