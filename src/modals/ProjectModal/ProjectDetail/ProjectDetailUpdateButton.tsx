import React from "react";
import { IProjectDetailUpdateButton, mdlProject, mdlUser, mdlVisibilityProjects } from "../../../types/Type";
import { updateProjects } from "../../../services/projectService";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProjects,
  setProjects,
  setVisibilityProjects,
} from "../../../redux/projects/projectsSlice";
import { updateVisibilityProjectsApi } from "../../../services/visibilityProjectServise";



const ProjectDetailUpdateButton: React.FC<IProjectDetailUpdateButton> = ({
  project,
  buttonActive,
  setButtonActive,
  updatedProject,
}) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const visibilityProjects = useSelector(
    (state: RootState) => state.projects.visibilityProjects
  );

  const updateVisibilityProjectItem = () => {
    const setUpdatedProject = { ...updatedProject };
    const {id} = setUpdatedProject;

    const newArray: mdlVisibilityProjects = visibilityProjects.map(
      (visibilityProject: mdlVisibilityProjects) => {
        if (visibilityProject.projectId == project.id) {
          let projectId = visibilityProject.projectId;
          let userId = visibilityProject.userId;
          const updatedVisibilityProject: mdlVisibilityProjects = {
            id,
            projectId,
            userId,
          };
          setTimeout(function () {
            updateVisibilityProjectsApi(
              visibilityProject.id,
              updatedVisibilityProject
            );
          }, 500);
          return updatedVisibilityProject;
        } else {
          return visibilityProject;
        }
      }
    );
    dispatch(setVisibilityProjects(newArray));
  };

  const updateProject = async (updateProject: mdlProject) => {
    setButtonActive(true);

    const setUpdatedProject = { ...updatedProject };
    setUpdatedProject.updatedDate = new Date();
    setUpdatedProject.updatedPerson = activeUser.id;

    const {
      id,
      projectName,
      createdDate,
      updatedDate,
      createdPerson,
      updatedPerson,
      totalContent,
      visibilityRole,
    } = setUpdatedProject;

    updateProjects(updateProject.id, setUpdatedProject);

    const newArr = projects.map((projects: mdlProject) => {
      if (projects.id === updateProject.id) {
        return {
          id,
          projectName,
          createdDate,
          updatedDate,
          createdPerson,
          updatedPerson,
          totalContent,
          visibilityRole,
        };
      }
      return projects;
    });
    dispatch(setProjects(newArr));
    dispatch(setAllProjects(newArr));

    //visibilityProject'de var ise oradan da update işlemi yapılıyor.
    updateVisibilityProjectItem();
  };

  return (
    <button
      type="button"
      className="btn btn-warning"
      data-dismiss="modal"
      onClick={() => updateProject(project)}
      disabled={buttonActive}
    >
      Update
    </button>
  );
};

export default ProjectDetailUpdateButton;
