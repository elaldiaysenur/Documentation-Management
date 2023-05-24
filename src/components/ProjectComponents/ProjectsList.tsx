import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {IProjectsList,mdlProject,mdlUser,mdlVisibilityProjects} from "../../types/Type";
import Project from "./Project";
import SortByProjectName from "./ProjectFilters/ProjectFilterButtons/SortByProjectName";
import SortByCreatedDate from "./ProjectFilters/ProjectFilterButtons/SortByCreatedDate";
import SortByUpdatedDate from "./ProjectFilters/ProjectFilterButtons/SortByUpdatedDate";
import SortByTotalContent from "./ProjectFilters/ProjectFilterButtons/SortByTotalContent";
import SortByVisibilityRole from "./ProjectFilters/ProjectFilterButtons/SortByVisibilityRole";
import ProjectFilters from "./ProjectFilters/ProjectFilters";

const ProjectsList: React.FC<IProjectsList> = ({ projectsControl, userId }) => {

  const projects = useSelector((state: RootState) => state.projects.projects);
    const [filterValues, setFilterValues] = useState({projectName: "",createdDate: "",updatedDate: "",visibilityRole: 0});
    const adminLoggedIn: boolean = useSelector((state: RootState) => state.users.adminLoggedIn);
    const activeUser: mdlUser = useSelector((state: RootState) => state.users.activeUser);
    const visibilityProjects = useSelector((state: RootState) => state.projects.visibilityProjects);

  return (
    <div className="container">
      <table className="table table-striped">
        <ProjectFilters filterValues={filterValues} projectsControl={projectsControl} adminLoggedIn={adminLoggedIn} setFilterValues={setFilterValues}/>
        <thead className="thead-dark">
          <tr style={{textAlign: "center"}}>
            <th scope="col">ID</th>
            <SortByProjectName />
            <SortByCreatedDate />
            <SortByUpdatedDate />
            <th scope="col">Created Person ID</th>
            <th scope="col">Updated Person ID</th>
            <SortByTotalContent />
            <SortByVisibilityRole />
            {(projectsControl !== "allProjects" || !adminLoggedIn) && (
              <th scope="col">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {adminLoggedIn
            ? projects.map((item: mdlProject, i: number) => {
                if (
                  item.projectName
                    .toLowerCase()
                    .includes(filterValues.projectName.toLowerCase())
                ) {
                  return (
                    <Project
                      project={item}
                      key={i}
                      projectsControl={projectsControl}
                      userId={userId}
                    />
                  );
                }
              })
            : projects.map((project: mdlProject, i: number) => {

                 return visibilityProjects.map((visibilityProject: mdlVisibilityProjects, i: number)=>{
                    if(visibilityProject.projectId === project.id && visibilityProject.userId === activeUser.id)
                    {
                      if (
                        project.projectName
                          .toLowerCase()
                          .includes(filterValues.projectName.toLowerCase())
                      ) {
                        return (
                          <Project
                            project={project}
                            key={i}
                            projectsControl={"visibilityProjectsMap"}
                          />
                        );
                      }
                    }
                  })
                

                }
              )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;
