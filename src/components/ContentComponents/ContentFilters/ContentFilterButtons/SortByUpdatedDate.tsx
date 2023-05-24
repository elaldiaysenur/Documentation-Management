import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setContents } from "../../../../redux/contents/contentsSlice";

const SortByUpdatedDate: React.FC = () => {
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.contents.contents);
  const [updatedDateSorted, setUpdatedDateSorted] = useState({
    sorted: "updatedDate",
    isReversed: false,
  });

  const sortUpdatedDate = () => {
    const sortedData = [...contents].sort((a, b) => {
      let dateA: any = new Date(a.updatedDate);
      let dateB: any = new Date(b.updatedDate);
      if (updatedDateSorted.isReversed) {
        return dateA - dateB;
      }
      return dateB - dateA;
    });

    dispatch(setContents(sortedData));
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
