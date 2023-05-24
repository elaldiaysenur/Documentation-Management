import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setContents } from "../../../../redux/contents/contentsSlice";

const SortByContentVersion: React.FC = () => {
  const [versionSorted, setVersionSorted] = useState({
    sorted: "version",
    isReversed: false,
  });
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.contents.contents);

  const sortContentVersion = () => {
    const sortedData = [...contents].sort((a, b) => {
      if (versionSorted.isReversed) {
        return a.version - b.version;
      }
      return b.version - a.version;
    });

    dispatch(setContents(sortedData));
    setVersionSorted({
      sorted: "version",
      isReversed: !versionSorted.isReversed,
    });
  };
  return (
    <th onClick={sortContentVersion} className="pointer" scope="col">
      Content Version
      {versionSorted.sorted ? (versionSorted.isReversed ? "▲" : "▼") : null}
    </th>
  );
};

export default SortByContentVersion;
