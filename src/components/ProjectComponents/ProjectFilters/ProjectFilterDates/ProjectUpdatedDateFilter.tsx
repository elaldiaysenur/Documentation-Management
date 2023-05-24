import React, {useState} from 'react'
import { IProjectDateFilter } from './ProjectCreatedDateFilter'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { dateFilterClear, setProjects, setVisibilityProjects } from '../../../../redux/projects/projectsSlice';
import { DateRangePicker } from 'rsuite';
import { mdlProject } from '../../../../types/Type';

const ProjectUpdatedDateFilter: React.FC<IProjectDateFilter> = ({adminLoggedIn}) => {
    
    const dispatch = useDispatch();
    const allProjects = useSelector((state: RootState)=>state.projects.allProjects);
    const projects = useSelector((state: RootState)=>state.projects.projects);
    const [updatedDateFilter, setUpdatedDateFilter] = useState();
    const [filterControl, setFilterControl] = useState<boolean>(true);

    const updatedDateRangeFilter = (value: any) => {
        if(filterControl)
        {
          setFilterControl(false);
          
          let startDate = new Date(value ? value[0] : "");
          let endDate = new Date(value ? value[1] : "");
          startDate.setDate(startDate.getDate()-1);
          endDate.setDate(endDate.getDate()+1);
          let filteredDates = allProjects.filter(function(date: mdlProject) {
            debugger;
            return new Date(date.updatedDate) >= startDate && new Date(date.updatedDate) <= endDate;
          });
          setUpdatedDateFilter(projects);
          dispatch(setProjects(filteredDates));
        } 
      };

      const filterOnClean = ()=>{
        setFilterControl(true);
        dispatch(setProjects(updatedDateFilter));
      }

  return (
    <DateRangePicker placeholder="Enter a valid date" onOk={updatedDateRangeFilter} onClean={filterOnClean} size="sm"/>
  )
}

export default ProjectUpdatedDateFilter