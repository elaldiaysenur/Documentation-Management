import React from "react";
import { IContentDetailUndoButton } from "../../../types/Type";

const ContentDetailUndoButton: React.FC<IContentDetailUndoButton> = ({
  content,
  updatedContent,
  setUpdatedContent,
  buttonActive,
}) => {
  const undoContent = () => {
    setUpdatedContent({
      id: content.id,
      contentName: content.contentName,
      createdPerson: content.createdPerson,
      updatedPerson: content.updatedPerson,
      createdDate: content.createdDate,
      updatedDate: content.updatedDate,
      version: content.version,
      content: content.content,
      contentTags: content.contentTags,
      projectId: content.projectId,
    });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={undoContent}
      disabled={buttonActive}
    >
      Undo Changes
    </button>
  );
};

export default ContentDetailUndoButton;
