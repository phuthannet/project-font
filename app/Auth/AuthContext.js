"use client";
import React from 'react';
import Navbar from './Navbar';
import { AuthProvider } from './AuthContext';

const AuthContext = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        {/* ส่วนอื่น ๆ ของแอพ */}
      </div>
    </AuthProvider>
  );
}

export default AuthContext;
