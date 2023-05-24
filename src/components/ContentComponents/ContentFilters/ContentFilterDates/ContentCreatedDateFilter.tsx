import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateRangePicker } from 'rsuite'
import { setContents} from '../../../../redux/contents/contentsSlice';
import { mdlContent } from '../../../../types/Type';
import { RootState } from '../../../../redux/store';

const ContentCreatedDateFilter: React.FC = () => {

    const contents = useSelector((state: RootState)=>state.contents.contents);
    const dispatch = useDispatch();
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
        let filteredDates = contents.filter(function(date: mdlContent) {
          return new Date(date.createdDate) >= startDate && new Date(date.createdDate) <= endDate;
        });
        setCreatedDateFilter(contents);
        dispatch(setContents(filteredDates));
      }
      };

      const filterOnClean = ()=>{
        setFilterControl(true);
        dispatch(setContents(createdDateFilter))
      }

  return (
    <DateRangePicker placeholder="Enter a valid date" onOk={createdDateRangeFilter} onClean={filterOnClean} size="sm"/>
  )
}

export default ContentCreatedDateFilter