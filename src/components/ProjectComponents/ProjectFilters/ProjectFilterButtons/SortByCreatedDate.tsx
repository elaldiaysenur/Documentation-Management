import React, { useState } from "react";
import { mdlUser } from "../../../../types/Type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  setProjects,
  setVisibilityProjects,
} from "../../../../redux/projects/projectsSlice";

const SortByCreatedDate: React.FC = () => {
  const [createdDateSorted, setCreatedDateSorted] = useState({
    sorted: "createdDate",
    isReversed: false,
  });
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const visibilityProjects = useSelector(
    (state: RootState) => state.projects.visibilityProjects
  );

  const sortCreatedDate = () => {
  

    const sortedData = [...projects].sort((a, b) => {
      let dateA: any = new Date(a.createdDate);
      let dateB: any = new Date(b.createdDate);
      if (createdDateSorted.isReversed) {
        return dateA - dateB;
      }
      return dateB - dateA;
    });

    dispatch(setProjects(sortedData));
    
    setCreatedDateSorted({
      sorted: "createdDate",
      isReversed: !createdDateSorted.isReversed,
    });
  };

  return (
    <th onClick={sortCreatedDate} className="pointer" scope="col">
      Created Date
      {createdDateSorted.sorted
        ? createdDateSorted.isReversed
          ? "▲"
          : "▼"
        : null}
    </th>
  );
};

export default SortByCreatedDate;
