import React, { useState } from "react";
import { mdlUser } from "../../../../types/Type";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjects,
  setVisibilityProjects,
} from "../../../../redux/projects/projectsSlice";

const SortByVisibilityRole: React.FC = () => {
  const [roleSorted, setRoleSorted] = useState({
    sorted: "visibilityRole",
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

  const sortVisibilityRole = () => {


    const sortedData = [...projects].sort((a, b) => {
      if (roleSorted.isReversed) {
        return a.visibilityRole - b.visibilityRole;
      }
      return b.visibilityRole - a.visibilityRole;
    });

    dispatch(setProjects(sortedData));
    
    setRoleSorted({
      sorted: "visibilityRole",
      isReversed: !roleSorted.isReversed,
    });
  };

  return (
    <th onClick={sortVisibilityRole} className="pointer" scope="col">
      Visibility Role
      {roleSorted.sorted ? (roleSorted.isReversed ? "▲" : "▼") : null}
    </th>
  );
};

export default SortByVisibilityRole;
