"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./profile.css";
import Cookies from "js-cookie";
import { Upload, Button, Modal, Alert, Space, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UpoloadAvatar = ({ id, username, profile, setisUserUpdated }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const handleCancel = () => {
    if (!uploading) {
      setModalVisible(false);
    }
  };

  const handleChange = ({ fileList }) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const isFileTypeAllowed = fileList.every((file) =>
      allowedTypes.includes(file.type)
    );

    if (!isFileTypeAllowed) {
      toast.error("Only JPEG, PNG, and GIF files are allowed*", {
        hideProgressBar: true,
      });
      return;
    }

    setFileList(fileList);
  };

  const handleSubmit = async () => {
    setUploading(true);
    if (!fileList.length) {
      setErrorMessage("File is required*");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
      formData.append("name", `${username} avatar`);
    });

    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `https://favorable-dawn-95d99e7a24.strapiapp.com/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { id, profile } = data[0];
      updateUserAvatarId(id, profile);
      setFileList([]);
      setSuccessMessage("Upload Successful");
      setModalVisible(false);
      setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserAvatarId = async (profile) => {
    try {
      const token = Cookies.get("token");
      await axios.put(
        `https://favorable-dawn-95d99e7a24.strapiapp.com/api/users/${id}`,
        { profile },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setisUserUpdated(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (errorMessage || successMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 4000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage, successMessage]);

  return (
    <>
      <div>
        <Button size="sm" onClick={() => setModalVisible(true)}>
          {`${profile ? "Change" : "Upload"} picture`}
        </Button>
        <Modal
          open={modalVisible}
          title={`${profile ? "Change" : "Upload"} your profile`}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="upload"
              type="primary"
              disabled={uploading}
              onClick={handleSubmit}
            >
              Upload
            </Button>,
          ]}
        >
          {uploading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <Upload
              onChange={handleChange}
              file={fileList}
              beforeUpload={() => false}
              accept=".png,.jpg,.jpeg"
              multiple={false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          )}
        </Modal>
      </div>
      <div className="fixed top-0 right-0 m-4">
        {errorMessage && (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
              closable
            />
          </Space>
        )}
        {successMessage && (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Alert
              message="Success"
              description={successMessage}
              type="success"
              showIcon
              closable
            />
          </Space>
        )}
      </div>
    </>
  );
};

export default UpoloadAvatar;
