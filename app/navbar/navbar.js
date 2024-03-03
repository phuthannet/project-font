"use client";

import React, { useState } from 'react';

const Navbar = () => {
  // สร้าง state เพื่อเก็บสถานะการเข้าสู่ระบบ
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ฟังก์ชันสำหรับเปลี่ยนสถานะการเข้าสู่ระบบ
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // สลับสถานะเป็นตรงข้าม
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white font-bold text-lg">Home</a>  
        </div>
        <div className="hidden md:flex">   
            <li><a href="/genimage/animagine-x1-3" className="text-gray-300 hover:text-white">MODEL animagine-x1-3</a></li>
            <li><a href="/genimage/stable-diffusion" className="text-gray-300 hover:text-white">MODEL stable-diffusion</a></li>
          {isLoggedIn ? (
            <a href="/logout" className="bg-red-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-red-600">Logout</a>
          ) : (
            <div>
              <a href="/login" className="bg-blue-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-blue-600" onClick={handleLogin}>Login</a>
              <a href="/register" className="bg-blue-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-blue-600">Sign Up</a>
            </div>
          )}
        </div>
        <div className="md:hidden">
          {/* Hamburger menu button */}
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M21 6H3a1 1 0 110-2h18a1 1 0 110 2zm0 5H3a1 1 0 110-2h18a1 1 0 110 2zm0 5H3a1 1 0 110-2h18a1 1 0 110 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
