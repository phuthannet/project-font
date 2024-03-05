"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./profile.css";
import { UserOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";
import UpoloadAvatar from "./UploadAvatar";

import { Avatar, Typography } from 'antd';

const { Paragraph } = Typography;


const Profile = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const token = Cookies.get("token");


  useEffect(() => {
    const getProfileData = async () => {
      console.log(token);
      try {
        const { data } = await axios.get(`https://favorable-dawn-95d99e7a24.strapiapp.com/api/users/me?populate=*`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data);
        console.log(data)
        setisUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [ isUserUpdated]);

  return (
    <div className="profile">
      <div className="avatar">
        <div className="avatar-wrapper">
          {user.profile ? (
            <Avatar src={user.profile.url} alt={`${user.username} avatar`} size={130} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )}
          <UpoloadAvatar
            token={token}
            id={user.id}
            username={user.username}
            profile={user.profile}
            setisUserUpdated={setisUserUpdated}
          />
        </div>
      </div>
      <div className="body">
        <Paragraph>Name: {user.username}</Paragraph>
        <Paragraph>Email: {user.email}</Paragraph>
        <Paragraph>
          Account created at: {new Date(user.createdAt).toLocaleDateString()}
        </Paragraph>
      </div>
    </div>
  );
};

export default Profile;