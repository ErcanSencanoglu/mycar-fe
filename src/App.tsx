import React from 'react';
import MainPage from './pages/MainPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainFilter from './components/filter/MainFilter';
import FilterPage from './pages/FilterPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/filter',
    element: <FilterPage />,
  },
]);
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
