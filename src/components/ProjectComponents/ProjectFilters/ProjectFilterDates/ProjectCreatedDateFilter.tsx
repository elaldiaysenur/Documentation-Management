import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateRangePicker } from 'rsuite'
import { dateFilterClear, setProjects, setVisibilityProjects } from '../../../../redux/projects/projectsSlice';
import { mdlProject } from '../../../../types/Type';
import { RootState } from '../../../../redux/store';


export interface IProjectDateFilter{
    adminLoggedIn: boolean;
}

const ProjectCreatedDateFilter: React.FC<IProjectDateFilter> = ({adminLoggedIn}) => {

    const dispatch = useDispatch();
    const allProjects = useSelector((state: RootState)=>state.projects.allProjects);
    const projects = useSelector((state: RootState)=>state.projects.projects);
    const [createdDateFilter, setCreatedDateFilter] = useState();
    const [filterControl, setFilterControl] = useState<boolean>(true);

    const createdDateRangeFilter = (value: any) => {
        if(filterControl)
        {
          setFilterControl(false);
          
          let startDate = new Date(value ? value[0] : "");
          let endDate = new Date(value ? value[1] : "");
          startDate.setDate(startDate.getDate()-1);
          endDate.setDate(endDate.getDate()+1);
          let filteredDates = allProjects.filter(function(date: mdlProject) {
            return new Date(date.createdDate) >= startDate && new Date(date.createdDate) <= endDate;
          });
          setCreatedDateFilter(projects);
          dispatch(setProjects(filteredDates));
        
        }
        };

        const filterOnClean = ()=>{
          setFilterControl(true);
          dispatch(setProjects(createdDateFilter));
        }
        
  return (
    <DateRangePicker placeholder="Enter a valid date" onOk={createdDateRangeFilter} onClean={filterOnClean} size="sm"/>
  )
}

export default ProjectCreatedDateFilter