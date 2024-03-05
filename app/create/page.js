"use client";
import axios from "axios";
import { Image, Input, Radio, Spin, Space, Alert } from "antd";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const optionsModels = [
  {
    label: "Animagine-x1-3",
    value: "Animagine-x1-3",
  },
  {
    label: "Stable-Diffusion",
    value: "Stable-Diffusion",
  },
];
async function getUser() {
  const token = Cookies.get("token");
  try {
    const user = await axios.get(
      "https://favorable-dawn-95d99e7a24.strapiapp.com/api/users/me?populate=*",
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.log(user);
    return user;
  } catch (error) {
    return error;
  }
}
async function create(prompt, model) {
  try {
    let response;
    if (model === "1") {
      response = await axios.post(
        "https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.0",
        { inputs: prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
          },
          responseType: "arraybuffer",
        }
      );
    } else {
      response = await axios.post(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        { inputs: prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
          },
          responseType: "arraybuffer",
        }
      );
    }
    const imageUrl = URL.createObjectURL(
      new Blob([response.data], { type: "image/jpeg" })
    );
    return imageUrl;
  } catch (error) {
    return "Request failed";
  }
}

function blobUrlToFile(blobUrl) {
  return new Promise((resolve, reject) => {
    try {
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const filename = blobUrl.substring(blobUrl.lastIndexOf("/") + 1);
          const file = new File([blob], filename, { type: blob.type });
          resolve(file);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default function Page() {
  const [prompt, setPrompt] = useState();
  const [description, setDescription] = useState();
  const [model, setModel] = useState("Animagine-x1-3");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disableBtnUpdate, setDisableBtnUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChangeRadio = ({ target: { value } }) => {
    setImageUrl(null);
    setModel(value);
  };
  const handlePromptChange = (event) => {
    setImageUrl(null);
    setPrompt(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    await fetchData();
  };

  const handleReset = () => {
    setPrompt();
    setDescription();
    setModel("1");
    setImageUrl(null);
    setDisableBtnUpdate(false);
  };

  const handleUpload = async () => {
    setDisableBtnUpdate(true);
    blobUrlToFile(imageUrl).then(async (file) => {
      if (file) {
        const user = await getUser();
        const formData = new FormData();
        formData.append("files.image", file);
        formData.append(
          "data",
          JSON.stringify({
            prompt: prompt,
            description: description,
            createBy: user.data.id,
            model: model,
          })
        );
        try {
          const response = await axios.post(
            "https://favorable-dawn-95d99e7a24.strapiapp.com/api/histories",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            setSuccessMessage("Image Uploaded Successfully!");
          } else {
            setDisableBtnUpdate(false);
            setErrorMessage("Failed to upload image!");
          }
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage("Failed to upload imagecatch!");
        }
      } else {
        setErrorMessage("Failed to convert Blob URL to file.");
      }
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await create(prompt, model);
      setImageUrl(data);
    } catch (error) {
      console.log("error");
      setErrorMessage(error);
    } finally {
      setLoading(false);
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="promp"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Prompt
            </label>
            <div className="mt-2">
              <Input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter Your Prompt"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="prompt"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Model
            </label>
            <div className="mt-2">
              <Radio.Group
                name="model"
                options={optionsModels}
                onChange={onChangeRadio}
                value={model}
                optionType="button"
                buttonStyle="solid"
              />
            </div>
          </div>
          <div className="text-center">
            {loading ? (
              <Spin size="large" />
            ) : (
              imageUrl && <Image src={imageUrl} alt="Generated" />
            )}
          </div>
          {imageUrl && (
            <div>
              <label
                htmlFor="Description"
                className="block text-xl font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter text"
                />
              </div>
            </div>
          )}
          <div>
            {!imageUrl && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Image
              </button>
            )}
          </div>
          <div>
            {imageUrl && (
              <button
                onClick={handleReset}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Reset
              </button>
            )}
          </div>
          <div>
            {imageUrl && (
              <button
                onClick={handleUpload}
                disabled={disableBtnUpdate}
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Upload and Post Image
              </button>
            )}
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
