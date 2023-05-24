import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IDeleteContent, mdlContent, mdlProject } from '../../types/Type';
import { deleteContents } from '../../services/contentService';
import { setAllContents, setContents } from '../../redux/contents/contentsSlice';
import { updateProjects } from '../../services/projectService';
import { setProjects } from '../../redux/projects/projectsSlice';



const DeleteContent: React.FC<IDeleteContent> = ({contentId, projectId}) => {


  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.contents.contents);
  const allContents = useSelector((state: RootState) => state.contents.allContents);

  const projects = useSelector((state:RootState)=>state.projects.projects);


  //amount
  const deleteContentAmount = () =>{

    let updatedContentAmount: mdlProject ={id:"", projectName: "", createdDate: new Date, updatedDate: new Date, createdPerson: "", updatedPerson: "", totalContent: 0, visibilityRole: 1};

    let newArray = projects.map((item: mdlProject)=>{
      if(item.id === projectId)
      {
        updatedContentAmount = {...item};
        updatedContentAmount.totalContent--;

        return updatedContentAmount;
      }
      return item;
    })
    
    updateProjects(updatedContentAmount.id, updatedContentAmount);

    dispatch(setProjects(newArray));
  }


  const deleteContent = (id: string) => {
    //api
    deleteContents(id);

    //delete amount
    setTimeout(deleteContentAmount, 100);

    const newArr = contents.filter((contents: mdlContent) => {
      if (contents.id !== id) {
        return contents;
      }
    });
    const newArray = allContents.filter((contents: mdlContent)=>{
      if(contents.id !== id)
      {
        return contents;
      }
    })
    dispatch(setContents(newArr));
    dispatch(setAllContents(newArray));
  };

  return (
    <button className="dropdown-item" onClick={() => deleteContent(contentId)}>
      Delete
    </button>
  )
}

export default DeleteContent