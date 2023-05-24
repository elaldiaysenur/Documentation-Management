import React from "react";
import DeleteProject from "./DeleteProject";
import { Link } from "react-router-dom";
import OnUserProjectRemoveButton from "./OnUserProject/OnUserProjectRemoveButton";
import ProjectDetailModal from "../../modals/ProjectModal/ProjectDetail/ProjectDetailModal";
import { IProject, mdlContent } from "../../types/Type";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import OnUserProjectAddButton from "./OnUserProject/OnUserProjectAddButton";

const Project: React.FC<IProject> = ({ project, projectsControl, userId, visibilityProject }) => {
  const allContents = useSelector(
    (state: RootState) => state.contents.allContents
  );

  const totalContent = () => {
    if (project.projectId) {
      return allContents.filter((content: mdlContent) => content.projectId === project.projectId).length;
    } else {
      return allContents.filter((content: mdlContent) => content.projectId === project.id).length;
    }
  };

  return (
    <>
      <tr style={{textAlign: "center"}}>
        <td>{project.id.substring(0, 2) + "..."}</td>
        <td>{project.projectName}</td>
        <td style={{width: "40px"}}>{(new Date(project.createdDate)).toLocaleDateString()  +"  "+ (new Date(project.createdDate)).toLocaleTimeString()}</td>
        <td>{(new Date(project.updatedDate)).toLocaleDateString()  +"  "+ (new Date(project.updatedDate)).toLocaleTimeString()}</td>
        <td>{project.createdPerson.substring(0, 6)}</td>
        <td>{project.updatedPerson.substring(0, 6)}</td>
        <td>{totalContent()}</td>
        <td>{project.visibilityRole}</td>
        {projectsControl === "addUserOnProject" ? (
          <td style={{ display: "flex", flexDirection: "column" }}>
            {/* Kullanıcının üzerine proje ekleme */}
            <OnUserProjectAddButton userId={userId} project={project} />
          </td>
        ) : projectsControl === "projectPanel" ? (
          <td style={{ display: "flex", flexDirection: "column" }}>
            {/* Projectpanelde görünecekler */}
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Options
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  to={`/contentpanel/${project.id}`}
                  className="dropdown-item"
                >
                  Contents
                </Link>
                <button
                  type="button"
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target={`#${project.id}`}
                >
                  Detail
                </button>
                <DeleteProject project={project} />
              </div>
            </div>
            <ProjectDetailModal project={project} />
          </td>
        ) : projectsControl === "onUserDeleteProject" ? (
          <td>
            {/* Kullanıcının üzerinden proje silme */}
            <OnUserProjectRemoveButton userId={userId} visibilityProjectId={visibilityProject?.id} />
          </td>
        ) : projectsControl === "visibilityProjectsMap" ? (
          <td>
            {/* Kullanıcı giriş yaptığı zaman gözükecek olan buton */}
            <Link to={`/contentpanel/${project.id}`}>
              <button className="btn btn-success">Contents</button>
            </Link>
          </td>
        ) : (
          <></>
        )}
      </tr>
    </>
  );
};

export default Project;
