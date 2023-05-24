import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setContents } from "../../../../redux/contents/contentsSlice";

const SortByCreatedDate: React.FC = () => {
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.contents.contents);
  const [createdDateSorted, setCreatedDateSorted] = useState({
    sorted: "createdDate",
    isReversed: false,
  });

  const sortCreatedDate = () => {
    const sortedData = [...contents].sort((a, b) => {
      let dateA: any = new Date(a.createdDate);
      let dateB: any = new Date(b.createdDate);
      if (createdDateSorted.isReversed) {
        return dateA - dateB;
      }
      return dateB - dateA;
    });

    dispatch(setContents(sortedData));
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
