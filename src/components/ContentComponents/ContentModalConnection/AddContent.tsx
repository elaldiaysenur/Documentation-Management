import React, { useState } from "react";
import AddContentModal from "../../../modals/ContentModal/AddContent/AddContentModal";
import { IAddContent } from "../../../types/Type";
const AddContent: React.FC<IAddContent> = ({ projectId }) => {

  return (
    <div>
      <button
        type="button"
        className="btn btn-success mb-3"
        data-toggle="modal"
        data-target={`#${projectId}`}
      >
        Add Content
      </button>
      <AddContentModal projectId={projectId}/>
    </div>
  );
};

export default AddContent;
