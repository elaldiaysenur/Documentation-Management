import React, { useState } from "react";
import { nanoid } from "nanoid";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addContents } from "../../../services/contentService";
import { addNewContent } from "../../../redux/contents/contentsSlice";
import { updateProjects } from "../../../services/projectService";
import {
  IAddContentModal,
  mdlContent,
  mdlContentTag,
  mdlProject,
  mdlUser,
} from "../../../types/Type";
import { setProjects } from "../../../redux/projects/projectsSlice";
import { toast } from "react-toastify";
import ContentTagAddButton from "../ContentTag/ContentTagAddButton";
import ContentTagRemoveButton from "../ContentTag/ContentTagRemoveButton";

const AddContentModal: React.FC<IAddContentModal> = ({ projectId }) => {
  const dispatch = useDispatch();
  const activeUser: mdlUser = useSelector(
    (state: RootState) => state.users.activeUser
  );
  const projects: mdlProject[] = useSelector(
    (state: RootState) => state.projects.projects
  );
  const [contentTag, setContentTag] = useState<string>("");

  const [newContent, setNewContent] = useState<mdlContent>({
    id: "",
    contentName: "",
    createdDate: new Date(),
    updatedDate: new Date(),
    createdPerson: "emrah",
    updatedPerson: "emrah",
    version: 0,
    content: "",
    contentTags: [],
    projectId: projectId,
  });

  const addContentAmount = () => {
    let updatedContentAmount: mdlProject = {
      id: "",
      projectName: "",
      createdDate: new Date(),
      updatedDate: new Date(),
      createdPerson: "",
      updatedPerson: "",
      totalContent: 0,
      visibilityRole: 1,
    };
    let newArr = projects.map((item: mdlProject) => {
      if (item.id === projectId) {
        updatedContentAmount = { ...item };
        updatedContentAmount.totalContent++;

        return updatedContentAmount;
      }
      return item;
    });

    //api amount
    updateProjects(updatedContentAmount.id, updatedContentAmount);

    dispatch(setProjects(newArr));
  };

  const createNewContent = () => {
    const updatedContent = { ...newContent };
    updatedContent.id = "id" + nanoid();
    updatedContent.createdDate = new Date();
    updatedContent.updatedDate = new Date();
    updatedContent.createdPerson = activeUser.id;
    updatedContent.updatedPerson = activeUser.id;
    // updatedContent.contentTags = updatedContent.contentTags[0].split(",");
    updatedContent.projectId = projectId;
    //api
    setTimeout(() => dispatch(addNewContent(updatedContent)), 100);
    // addContents(updatedContent);
    setTimeout(() => addContents(updatedContent), 500);
  };

  const addContent = async () => {
    setContentTag("");
    if (newContent.contentName === "" || newContent.content === "") {
      toast.error("Please fill in all the blanks..");
    } else {
      createNewContent();

      //clear content
      setNewContent({
        id: "",
        contentName: "",
        createdDate: new Date(),
        updatedDate: new Date(),
        createdPerson: "",
        updatedPerson: "",
        version: 0,
        content: "",
        contentTags: [],
        projectId: "",
      });

      //add amount
      setTimeout(addContentAmount, 100);
      toast.success("Content successfully added");
    }
  };
  const handleChange = (e: any) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
    if (e.target.name === "contentTags") {
      setNewContent({ ...newContent, ["contentTags"]: [e.target.value] });
    }
  };

  const tagChange = (e: any, item: mdlContentTag) => {
    let updatedContentTags = newContent.contentTags.map(
      (contentTag: mdlContentTag) => {
        if (item.id === contentTag.id) {
          return { id: contentTag.id, tag: e.target.value };
        } else {
          return { id: contentTag.id, tag: contentTag.tag };
        }
      }
    );
    setNewContent({ ...newContent, ["contentTags"]: updatedContentTags });
  };

  return (
    <div
      className="modal fade"
      id={`${projectId}`}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <form>
                <div>
                  <h3
                    style={{
                      width: "400px",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Add Content
                  </h3>
                </div>
                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Content Name</label>
                  <input
                    type="text"
                    value={newContent.contentName}
                    onChange={handleChange}
                    name="contentName"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Content Version</label>
                  <input
                    type="text"
                    value={newContent.version}
                    onChange={handleChange}
                    name="contentVersion"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleFormControlTextarea1">
                    Please Content Write Here
                  </label>

                  <textarea
                    rows={6}
                    value={newContent.content}
                    onChange={handleChange}
                    name="content"
                    className="form-control"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label htmlFor="exampleInput">Content Tags</label>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <input
                      type="text"
                      value={contentTag}
                      onChange={(e) => setContentTag(e.target.value)}
                      name="contentTags"
                      className="form-control"
                    />
                    <ContentTagAddButton
                      newContent={newContent}
                      contentTag={contentTag}
                      setContentTag={setContentTag}
                      contentType="addContentModal"
                    />
                  </div>
                </div>
                <div style={{margin: "0px 60px"}}>
                  <ul>
                    {newContent.contentTags.map((item: mdlContentTag) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <li style={{listStyle: "none"}}>
                            <input
                              value={item.tag}
                              onChange={(e) => tagChange(e, item)}
                            />
                          </li>
                          <ContentTagRemoveButton
                            newContent={newContent}
                            setNewContent={setNewContent}
                            contentTagId={item.id}
                          />
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={addContent}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;
