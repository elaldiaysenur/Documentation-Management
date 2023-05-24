import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddContent from "../components/ContentComponents/ContentModalConnection/AddContent";
import { useDispatch, useSelector } from "react-redux";
import { getContentsAsync } from "../services/contentService";
import ContentList from "../components/ContentComponents/ContentList";
import { RootState } from "../redux/store";
import Loading from "../components/Loading";
import { dateFilterClear } from "../redux/projects/projectsSlice";

const ContentPanel: React.FC = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const contentsIsLoading = useSelector((state: RootState) => state.contents.contentsIsLoading);
  const adminLoggedIn = useSelector((state:RootState)=>state.users.adminLoggedIn);

  useEffect(() => {
    dispatch(getContentsAsync(id));
  }, [dispatch]);

  return (
    <>
      {contentsIsLoading === "loading" ? (
        <Loading />
      ) : (
        <>
          <div className='container d-flex mt-5'>
            {adminLoggedIn && <AddContent projectId={String(id)} />}
            <Link to={adminLoggedIn ? "/projectpanel" : "/projects"}>
              <button className="btn btn-danger mb-3" onClick={()=>dispatch(dateFilterClear())}>Back</button>
            </Link>
          </div>
          <ContentList projectId={id}/>
        </>
      )}
    </>
  );
};

export default ContentPanel;
