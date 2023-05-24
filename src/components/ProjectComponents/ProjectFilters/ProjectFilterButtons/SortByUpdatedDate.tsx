import React, { useState } from "react";
import { mdlUser } from "../../../../types/Type";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjects,
  setVisibilityProjects,
} from "../../../../redux/projects/projectsSlice";

const SortByUpdatedDate: React.FC = () => {
  const [updatedDateSorted, setUpdatedDateSorted] = useState({
    sorted: "updatedDate",
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

  const sortUpdatedDate = () => {

    const sortedData = [...projects].sort((a, b) => {
      let dateA: Date = new Date(a.updatedDate);
      let dateB: Date = new Date(b.updatedDate);
      if (updatedDateSorted.isReversed) {
        return Number(dateA) - Number(dateB);
      }
      return Number(dateB) - Number(dateA);
    });

 
      dispatch(setProjects(sortedData));
    
    setUpdatedDateSorted({
      sorted: "updatedDate",
      isReversed: !updatedDateSorted.isReversed,
    });
  };

  return (
    <th onClick={sortUpdatedDate} className="pointer" scope="col">
      Updated Date
      {updatedDateSorted.sorted
        ? updatedDateSorted.isReversed
          ? "▲"
          : "▼"
        : null}
    </th>
  );
};

export default SortByUpdatedDate;
