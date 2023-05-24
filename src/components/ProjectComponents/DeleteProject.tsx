import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteProjects } from '../../services/projectService';
import { IProjectProp, mdlProject, mdlVisibilityProjects } from '../../types/Type';
import { setAllProjects, setProjects, setVisibilityProjects } from '../../redux/projects/projectsSlice';


const DeleteProject: React.FC<IProjectProp> = ({project}) => {

  let deletedItems: mdlVisibilityProjects = {id: "", userId: "", projectId: ""};

  
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const visibilityProjects = useSelector((state: RootState)=>state.projects.visibilityProjects);

  const removeVisibilityProjectItem = () =>{
   
    const newArray: mdlVisibilityProjects = visibilityProjects.filter((visibilityProject: mdlVisibilityProjects)=>{
      if(visibilityProject.projectId!==project.id)
      {
        return visibilityProject;
      }else{
        deletedItems = visibilityProject;
      }
    });
    dispatch(setVisibilityProjects(newArray));

    
    
  }


  const deletedProject = (item: mdlProject) => {
    deleteProjects(item.id);
    //api

    const newArr = projects.filter((projects: mdlProject) => {
      if (projects.id !== item.id) {
        return projects;
      }
    });
    dispatch(setProjects(newArr));
    dispatch(setAllProjects(newArr));

    //visibilityProjects'den silme işlemi
    setTimeout(removeVisibilityProjectItem, 500);

  };

  return (
    <button className="btn btn-danger dropdown-item" onClick={() => deletedProject(project)} style={{width: "100px"}}>
      Delete
    </button>
  )
}

export default DeleteProject