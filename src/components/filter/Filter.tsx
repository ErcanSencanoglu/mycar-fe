import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom';
import { fetchItems } from '../../slices/FilterItemSlice';
import FirstDetail from './FirstDetail';
import { Container } from '@mui/material';

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
      <Container 
       sx={{
        maxWidth: {
          xs: 'lg',
          sm: 'lg',
          md: 'lg', 
          lg: 'lg', 
          xl: 'lg',
        },
        padding: (theme) => theme.spacing(2),

        display: 'flex',
        flexDirection: 'column',
        gap: (theme) => theme.spacing(2),

        border: '1px solid lightGrey', 
        borderRadius: 1, 
      }}
      >
      {data.map((key,index)=>    {return<FirstDetail key={index} item={key}></FirstDetail>})}
      </Container>
    </div>
  )
}

export default Filter
//    {data.map((key,index)=>    {return <div key={index}>{key.id}</div>;})}
