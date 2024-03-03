import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-white font-bold text-lg">Logo</a>
          <ul className="ml-4 flex items-center space-x-4">
            <li><a href="/genimage/animagine-x1-3" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="/genimage/stable-diffusion" className="text-gray-300 hover:text-white">About</a></li>
           
          </ul>
        </div>
        <div className="hidden md:block">
          <a href="/login" className="text-gray-300 hover:text-white">Login</a>
          <a href="/register" className="bg-blue-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-blue-600">Sign Up</a>
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
