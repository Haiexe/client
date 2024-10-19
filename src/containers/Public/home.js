import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

const Home = () => {
  return (
    <div className='w-full m-auto h-full flex flex-col items-center'>
      <Header />
      <Navigation/>
      <div className="w-1100 flex flex-col items-center justify-start">
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;
