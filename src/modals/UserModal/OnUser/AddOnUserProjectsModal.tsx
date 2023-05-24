import React from 'react'
import {IUserProp } from '../../../types/Type'
import ProjectsList from '../../../components/ProjectComponents/ProjectsList'

const AddOnUserProjectsModal: React.FC<IUserProp> = ({user}) => {
  return (
    <div
      className="modal fade" id={user?.id + "add"} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body">

        <h3 className='text-center mt-3'>Add Project</h3>
          <div style={{display: "flex", justifyContent: "center",marginTop: "50px"}}>
            <ProjectsList projectsControl={"addUserOnProject"} userId={user?.id}/>
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
  )
}

export default AddOnUserProjectsModal