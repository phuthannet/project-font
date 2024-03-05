"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { updateLoginStatus, checkOut } from "./action";
import "./globals.css";
import Navbar from "./navbar/navbar";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const initNav = async () => {
    try {
      const result = await updateLoginStatus();
      if (result.token) {
        setIsLoggedIn(true);
      }
      setUserName(result.username);
    } catch (error) {}
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    setUserName("");
    setIsLoggedIn(false);
    checkOut();
  };

  useEffect(() => {
    const fetchNav = async () => {
      await initNav();
    };
    fetchNav();
  }, [isLoggedIn, userName]);

  return (
    <html lang="en">
      <body>
        <header>
          <div>
            <AntdRegistry>
              <Navbar
                isLoggedIn={isLoggedIn}
                userName={userName}
                handleLogout={handleLogout}
              ></Navbar>
            </AntdRegistry>
          </div>
        </header>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
