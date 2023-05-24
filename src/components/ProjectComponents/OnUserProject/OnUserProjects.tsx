import React from "react";
import {
  IUserProp,
  mdlProject,
  mdlVisibilityProjects,
} from "../../../types/Type";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import Project from "../Project";

const OnUserProjects: React.FC<IUserProp> = ({ user }) => {
  const visibilityProjects = useSelector(
    (state: RootState) => state.projects.visibilityProjects
  );
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <div className="container">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Project Name </th>
            <th scope="col">Created Date</th>
            <th scope="col">Updated Date</th>
            <th scope="col">Created Person</th>
            <th scope="col">Updated Person</th>
            <th scope="col">Total Content</th>
            <th scope="col">Visibility Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibilityProjects.map((visibilityProject: mdlVisibilityProjects, i: string) => {
              return projects.map((project: mdlProject, i: number) => {
                if (visibilityProject.projectId === project.id && visibilityProject.userId === user.id
                ) {
                    return (
                      <Project
                        project={project}
                        key={i}
                        projectsControl={"onUserDeleteProject"}
                        visibilityProject={visibilityProject}
                      />
                    );
                }
              });
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OnUserProjects;
