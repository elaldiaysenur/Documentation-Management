import React from "react";
import { IProjectDetailUndoButton } from "../../../types/Type";

const ProjectDetailUndoButton: React.FC<IProjectDetailUndoButton> = ({project,setUpdatedProject,buttonActive}) => {
  const undoProject = () => {
    setUpdatedProject({
      id: project.id,
      projectName: project.projectName,
      createdDate: project.createdDate,
      updatedDate: project.updatedDate,
      createdPerson: project.createdPerson,
      updatedPerson: project.updatedPerson,
      totalContent: project.totalContent,
      visibilityRole: project.visibilityRole,
    });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={undoProject}
      disabled={buttonActive}
    >
      Undo Changes
    </button>
  );
};

export default ProjectDetailUndoButton;
