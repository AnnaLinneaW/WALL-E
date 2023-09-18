import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { getCardUser } from "../redux/addNameSlice";


export const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardUser());
  }, []);

  return (
    <div className="site-wrapper">
      <Navbar />
      <Outlet />
    </div>
  );
};
