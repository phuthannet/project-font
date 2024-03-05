"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UploadAvatar from "./UploadAvatar";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

const { Paragraph } = Typography;

const Profile = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const getProfileData = async () => {
      console.log(token);
      try {
        const { data } = await axios.get(
          `https://favorable-dawn-95d99e7a24.strapiapp.com/api/users/me?populate=*`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUser(data);
        console.log(data);
        setIsUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [isUserUpdated]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {user.profile ? (
              <Avatar
                src={user.profile.url}
                alt={`${user.username} avatar`}
                size={130}
              />
            ) : (
              <Avatar icon={<UserOutlined />} size={130} />
            )}
            <UploadAvatar
              token={token}
              id={user.id}
              username={user.username}
              profile={user.profile}
              setisUserUpdated={setIsUserUpdated}
            />
          </div>
        </div>
        <div className="mt-4 text-left">
          <Paragraph className="mb-2">Username: {user.username}</Paragraph>
          <Paragraph className="mb-2">Email: {user.email}</Paragraph>
          <Paragraph className="mb-2">
            Account created at: {new Date(user.createdAt).toLocaleDateString()}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default Profile;
