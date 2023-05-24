import React from "react";
import { IContentDetailUpdateButton, mdlContent, mdlUser } from "../../../types/Type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateContents } from "../../../services/contentService";
import { setContents } from "../../../redux/contents/contentsSlice";

const ContentDetailUpdateButton: React.FC<IContentDetailUpdateButton> = ({
  content,
  updatedContent,
  buttonActive,
  setButtonActive,
}) => {
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const contents = useSelector((state: RootState) => state.contents.contents);
  const dispatch = useDispatch();

  const updateContent = async (item: mdlContent) => {
    setButtonActive(true);
    
    const setUpdatedContent = { ...updatedContent };
    setUpdatedContent.updatedDate = new Date();
    setUpdatedContent.updatedPerson = activeUser.id;
    // setUpdatedContent.contentTags = setUpdatedContent.contentTags[0].split(",");

    const {
      id,
      contentName,
      createdPerson,
      updatedPerson,
      createdDate,
      updatedDate,
      version,
      content,
      contentTags,
      projectId,
    } = setUpdatedContent;

    updateContents(item.id, setUpdatedContent);
    //api

    const newArr = contents.map((contents: mdlContent) => {
      if (contents.id === item.id) {
        return {
          id,
          contentName,
          createdPerson,
          updatedPerson,
          createdDate,
          updatedDate,
          version,
          content,
          contentTags,
          projectId,
        };
      }
      return contents;
    });
    dispatch(setContents(newArr));
  };

  return (
    <button
      type="button"
      className="btn btn-warning"
      data-dismiss="modal"
      disabled={buttonActive}
      onClick={() => updateContent(content)}
    >
      Update
    </button>
  );
};

export default ContentDetailUpdateButton;
