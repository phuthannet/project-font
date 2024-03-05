"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = Cookies.get('token');
      setIsLoggedIn(!!token);
    };
    checkLoggedIn();
  }, []); 

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white font-bold text-lg">Home</a>  
        </div>
        <div className="hidden md:flex flex-grow justify-end">     
            <li><a href="/create" className="text-gray-300 hover:text-white">Select models</a></li>
        </div>
        {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-red-600">Logout</button>
          ) : (
            <div>
              <a href="/login" className="bg-blue-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-blue-600">Login</a>
              <a href="/register" className="bg-blue-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-blue-600">Sign Up</a>
            </div>
          )}
        <div className="md:hidden">
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
