import React from "react";
import { IContent, mdlContentTag } from "../../types/Type";
import DeleteContent from "./DeleteContent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ContentDetailModal from "../../modals/ContentModal/ContentDetail/ContentDetailModal";


const Content: React.FC<IContent> = ({ content, projectId }) => {
  const adminLoggedIn = useSelector(
    (state: RootState) => state.users.adminLoggedIn
  );

  return (
    <>
      <tr>
        <td scope="row">{content.id.substring(0, 2) + "..."}</td>
        <td scope="row">{content.contentName}</td>
        <td>{(new Date(content.createdDate)).toLocaleDateString()  +"  "+ (new Date(content.createdDate)).toLocaleTimeString()}</td>
        <td>{(new Date(content.updatedDate)).toLocaleDateString()  +"  "+ (new Date(content.updatedDate)).toLocaleTimeString()}</td>
        <td scope="row">{content.createdPerson.substring(0, 6)}</td>
        <td scope="row">{content.updatedPerson.substring(0, 6)}</td>
        <td scope="row">{content.version}</td>
        <td scope="row">{content.content.substring(0, 20) + "..."}</td>
        <td scope="row" style={{textAlign: "center"}}>{content.contentTags.slice(0,2).map((item: mdlContentTag)=>{
          return <p>{item.tag}</p>
        })}
        {content.contentTags.length>2 && <p>...</p>}</td>
        <td scope="row" style={{ display: "flex", flexDirection: "column" }}>
          {adminLoggedIn ? (
            <>
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Options
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    type="button"
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target={`#${content.id}`}
                  >
                    Detail
                  </button>
                  <DeleteContent contentId={content.id} projectId={projectId} />
                </div>
              </div>
              <ContentDetailModal content={content} />
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#${content.id}`}
              >
                Detail
              </button>
              <ContentDetailModal content={content} />
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default Content;
