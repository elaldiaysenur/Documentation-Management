import React, { useEffect } from "react";
import AddProject from "../components/ProjectComponents/ProjectModalConnection/AddProject";
import { Link } from "react-router-dom";
import ProjectsList from "../components/ProjectComponents/ProjectsList";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsAsync } from "../services/projectService";
import { getAllContentsAsync } from "../services/contentService";
import Loading from "../components/Loading";

const ProjectPanel: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const allContents = useSelector(
    (state: RootState) => state.contents.allContents
  );
  const projectsIsLoading = useSelector(
    (state: RootState) => state.projects.projectsIsLoading
  );
  const allContentsIsLoading = useSelector(
    (state: RootState) => state.contents.allContentsIsLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (projects.length == 0) dispatch(getProjectsAsync());

    if (allContents.length == 0) dispatch(getAllContentsAsync());
  }, [dispatch]);

  return (
    <>
      {projectsIsLoading === "loading" || allContentsIsLoading === "loading" ? (
        <Loading />
      ) : (
        <>
          <div className="container d-flex mt-5">
            <AddProject />
          </div>
          <ProjectsList projectsControl={"projectPanel"} />
        </>
      )}
    </>
  );
};

export default ProjectPanel;
