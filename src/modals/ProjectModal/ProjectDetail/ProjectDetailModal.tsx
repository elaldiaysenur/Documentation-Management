import React, { useState, useEffect } from "react";
import { IProjectProp, mdlProject } from "../../../types/Type";

import ProjectDetailUpdateButton from "./ProjectDetailUpdateButton";
import ProjectDetailUndoButton from "./ProjectDetailUndoButton";

const ProjectDetailModal: React.FC<IProjectProp> = ({ project }) => {
  const [buttonActive, setButtonActive] = useState(true);
  const [updatedProject, setUpdatedProject] = useState<mdlProject>({
    id: project.id,
    projectName: project.projectName,
    createdDate: project.createdDate,
    updatedDate: project.updatedDate,
    createdPerson: project.createdPerson,
    updatedPerson: project.updatedPerson,
    totalContent: project.totalContent,
    visibilityRole: project.visibilityRole,
  });

  const handleChange = (e: any) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
    if (e.target.name === "visibilityRole") {
      setUpdatedProject({
        ...updatedProject,
        visibilityRole: Number(e.target.value),
      });
    }
  };

  useEffect(() => {
    if (JSON.stringify(updatedProject) == JSON.stringify(project)) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [updatedProject]);

  return (
    <div
      className="modal fade"
      id={project.id}
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
                marginTop: "100px",
              }}
            >
              <form>
                <div
                  style={{
                    marginBottom: "75px",
                    width: "400px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <h3>Project Detail</h3>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Project Name</label>
                  <input
                    type="text"
                    value={updatedProject.projectName}
                    name="projectName"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Role</label>
                  <input
                    type="text"
                    value={updatedProject.visibilityRole}
                    name="visibilityRole"
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
            <ProjectDetailUndoButton
              project={project}
              setUpdatedProject={setUpdatedProject}
              buttonActive={buttonActive}
            />
            <ProjectDetailUpdateButton
              project={project}
              updatedProject={updatedProject}
              buttonActive={buttonActive}
              setButtonActive={setButtonActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
