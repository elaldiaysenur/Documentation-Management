import React, { useState } from "react";
import { mdlUser } from "../../../../types/Type";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjects,
  setVisibilityProjects,
} from "../../../../redux/projects/projectsSlice";

const SortByTotalContent: React.FC = () => {
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const visibilityProjects = useSelector(
    (state: RootState) => state.projects.visibilityProjects
  );

  const [totalSorted, setTotalSorted] = useState({
    sorted: "totalContent",
    isReversed: false,
  });

  const sortTotalContent = () => {

    const sortedData = [...projects].sort((a, b) => {
      if (totalSorted.isReversed) {
        return a.totalContent - b.totalContent;
      }
      return b.totalContent - a.totalContent;
    });

 
    dispatch(setProjects(sortedData));
    
    setTotalSorted({
      sorted: "totalContent",
      isReversed: !totalSorted.isReversed,
    });
  };
  return (
    <th onClick={sortTotalContent} className="pointer" scope="col">
      Total Content
      {totalSorted.sorted ? (totalSorted.isReversed ? "▲" : "▼") : null}
    </th>
  );
};

export default SortByTotalContent;
