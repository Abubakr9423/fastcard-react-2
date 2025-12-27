import React from 'react'
import { Outlet } from 'react-router-dom'
import img1 from "../assets/Group 1116606595 (1).png"

const Layout = () => {
  return (
    <div>
        <header>
          <nav>
            <img src={img1} alt="" />
            w
          </nav>
        </header>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout