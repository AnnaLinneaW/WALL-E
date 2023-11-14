import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { getCardUser } from "../redux/createCardSlice";

export const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardUser());
  }, []);

  return (
    <div className="site-wrapper">
      <Navbar />
      <h1>WALL-E</h1>
      <Outlet />
    </div>
  );
};
