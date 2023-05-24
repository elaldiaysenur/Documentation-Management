import React from "react";
import { IUserProp } from "../../../types/Type";
import OnUserProjectContainer from "../../../components/ProjectComponents/OnUserProject/OnUserProjectContainer";


const OnUserProjectsModal: React.FC<IUserProp> = ({ user }) => {
  
  return (
    <div
      className="modal fade" id={user.id + "on"} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div style={{display: "flex", justifyContent: "center",marginTop: "50px"}}>
              {user.totalProject === 0 ? <h3>This user has no projects</h3> : <OnUserProjectContainer user={user}/>}
              
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-success" data-dismiss="modal">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnUserProjectsModal;
