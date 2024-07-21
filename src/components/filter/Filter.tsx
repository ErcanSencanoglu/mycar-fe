import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom';
import { fetchItems } from '../../slices/FilterItemSlice';

function Filter() {
  const dispact = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const filterFormData = useSelector((state: RootState) => state.filterFormData)

  const filterItemState = useSelector((state: RootState) => state.filterItem) 
  const {data, loading, error} = filterItemState;

  useEffect(()=>{
    filterFormData.data && dispact(fetchItems(filterFormData.data))
    console.log("filter form data-------",filterFormData.data);
  }, [dispact])

  return (
    <div>
        {data.map((key,index)=>    {return <div key={index}>{key.id}</div>;})}
    </div>
  )
}

export default Filter
