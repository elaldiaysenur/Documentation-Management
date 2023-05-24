import React from "react";
import AddProjectModal from "../../../modals/ProjectModal/AddProject/AddProjectModal";

const AddProject: React.FC = () => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-success mr-1 mb-3"
        data-toggle="modal"
        data-target="#addProject"
      >
        Add Project
      </button>
      <AddProjectModal />
    </div>
  );
};

export default AddProject;
