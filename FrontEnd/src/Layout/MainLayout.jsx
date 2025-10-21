import React from 'react'
import Canvas from '../Components/Background/Canvas'
import NavBar from '../Components/NavBar'
import { Outlet } from "react-router";
export const MainLayout = () => {
  return (
    <Canvas >
    {/* Navbar */}
      <NavBar />
      <div className='relative z-20'>
        <Outlet />

      </div>
    {/* breadgumbs */}
    {/* Intrroductuin */}
    {/* Featured */}
    {/* Footer */}
  </Canvas>
  )
}
