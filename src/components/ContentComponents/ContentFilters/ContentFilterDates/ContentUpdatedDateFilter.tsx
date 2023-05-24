import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateRangePicker } from 'rsuite'
import { setContents} from '../../../../redux/contents/contentsSlice';
import { mdlContent } from '../../../../types/Type';
import { RootState } from '../../../../redux/store';

const ContentUpdatedDateFilter: React.FC = () => {

  const contents = useSelector((state: RootState)=>state.contents.contents);
  const dispatch = useDispatch();
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
          let filteredDates = contents.filter(function(date: mdlContent) {
          return new Date(date.updatedDate) >= startDate && new Date(date.updatedDate) <= endDate;
        });
        setUpdatedDateFilter(contents);
        dispatch(setContents(filteredDates));
      }
      };
    
      const filterOnClean = ()=>{
        setFilterControl(true);
        dispatch(setContents(updatedDateFilter))
      }
    
  return (
    <DateRangePicker onOk={updatedDateRangeFilter} onClean={filterOnClean} size="sm"/>
  )
}

export default ContentUpdatedDateFilter