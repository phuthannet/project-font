"use client";
import { useState, useEffect } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Input, Radio, Spin, Space, Alert } from "antd";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  console.log(isJpgOrPng);
  if (!isJpgOrPng) {
    // console.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    // console.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    console.log(info.file.status);
    if (info.file.status === "done") {
      console.log(info.file.status);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    if (info.file.status === "error") {
      setErrorMessage("Upload failed");
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </div>
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
    </div>
  );
}
