import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IOnUserProjectAddButton, mdlUser, mdlVisibilityProjects } from "../../../types/Type";
import { setUsers } from "../../../redux/users/usersSlice";
import { updateUsers } from "../../../services/userService";
import { addVisibilityProjectsApi } from "../../../services/visibilityProjectServise";
import { addVisibilityProjects } from "../../../redux/projects/projectsSlice";
import { nanoid } from "nanoid";
import {toast} from "react-toastify";




const OnUserProjectAddButton: React.FC<IOnUserProjectAddButton> = ({ userId, project}) => {
  
  const users = useSelector((state: RootState)=>state.users.users);
  const visibilityProjects = useSelector((state: RootState)=>state.projects.visibilityProjects);
  const dispatch = useDispatch();


  const addProjectAmount = async()=>{
    let updatedProjectAmount: mdlUser ={id:"", name: "", surname: "", password: "", role: 0, createdDate: new Date, updatedDate: new Date, createdPerson: "", updatedPerson: "", totalProject: 0};
    const newUserArray = users.map((user: mdlUser)=>{
      if(user.id===userId)
      {
        updatedProjectAmount = {...user};
        updatedProjectAmount.totalProject++;
        return updatedProjectAmount
      }
      return user;
    });

    await updateUsers(updatedProjectAmount.id, updatedProjectAmount);

    dispatch(setUsers(newUserArray));
  }

  const handleClick = () => {
    
    const newUser: mdlUser = users.find((user: mdlUser)=>{
      if(user.id===userId)
      {
        return user;
      }
    });

    const newArr = visibilityProjects.map((visibilityProject: mdlVisibilityProjects)=>{
      if(visibilityProject.projectId===project.id && visibilityProject.userId=== userId)
      {
        return false;
      }else{
        return true;
      }
    });

    if(newUser.role===project.visibilityRole)
    {
  
      if(!newArr.includes(false) || newArr.length ===0)
      {
      const randomId = nanoid();
      const newItem = {id: randomId, userId, projectId: project.id};
      addVisibilityProjectsApi(newItem);
      dispatch(addVisibilityProjects(newItem));
      
      setTimeout(addProjectAmount, 100);
      toast.success("Project successfully added on user!");
    }else{
      toast.error("Already added on user!");
    };
  }else{
    toast.error("User role and project role do not match!");
  }
  };

  const visibility = () =>{
    return visibilityProjects.find((item: mdlVisibilityProjects)=>(item.projectId===project.id && item.userId===userId));
  }


  return (
    <button
      className="btn btn-success"
      onClick={handleClick}
      disabled={visibility()}
    >
      Add
    </button>
  );
};

export default OnUserProjectAddButton;
