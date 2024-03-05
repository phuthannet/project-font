"use client";
import { UserOutlined } from "@ant-design/icons";
import { Space } from "antd";
const Navbar = ({ isLoggedIn, userName, handleLogout }) => {
  return (
    <nav className="bg-indigo-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="grid grid-cols-2">
          <a href="/" className="text-white font-bold text-lg">
            Home
          </a>
          <a href="/create" className="text-white font-bold text-lg">
            Generate Image
          </a>
        </div>
        <div className="hidden md:flex">
          {isLoggedIn &&(
            <>
              <p className="text-white font-bold text-lg">{userName}</p>
              <Space>
                <a
                  href="/user"
                  className="bg-blue-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                  <UserOutlined size="large" />
                </a>
              </Space>
              <button
                onClick={handleLogout}
                className="bg-red-500 ml-4 py-2 px-6 text-white font-bold rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M21 6H3a1 1 0 110-2h18a1 1 0 110 2zm0 5H3a1 1 0 110-2h18a1 1 0 110 2zm0 5H3a1 1 0 110-2h18a1 1 0 110 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
