import React, { useState } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setContents } from "../../../../redux/contents/contentsSlice";

const SortByContentName: React.FC = () => {
  const [contentNameSorted, setContentNameSorted] = useState({
    sorted: "contentName",
    isReversed: false,
  });
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.contents.contents);

  const sortContentName = () => {
    const sortedData = [...contents].sort((a, b) => {
      if (contentNameSorted.isReversed) {
        return b.contentName.localeCompare(a.contentName);
      }
      return a.contentName.localeCompare(b.contentName);
    });

    dispatch(setContents(sortedData));
    setContentNameSorted({
      sorted: "contentName",
      isReversed: !contentNameSorted.isReversed,
    });
  };

  return (
    <th onClick={sortContentName} className="pointer" scope="col">
      Content Name
      {contentNameSorted.sorted
        ? contentNameSorted.isReversed
          ? "▲"
          : "▼"
        : null}
    </th>
  );
};

export default SortByContentName;
