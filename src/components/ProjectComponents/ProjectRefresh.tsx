import React from "react";
import { useDispatch } from "react-redux";
import { getVisibilityProjectsAsync } from "../../services/visibilityProjectServise";
import { getAllContentsAsync } from "../../services/contentService";

const ProjectRefresh: React.FC = () => {
  const dispatch = useDispatch();
  const refresh = () => {
    dispatch(getAllContentsAsync());
    dispatch(getVisibilityProjectsAsync());
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      style={{ width: "25px", height: "25px", cursor: "pointer" }}
      onClick={refresh}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
};

export default ProjectRefresh;
