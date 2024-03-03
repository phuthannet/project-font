"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { updateHeartCount, getUserId, fetchBlog } from "./action";
import { Alert, Space } from "antd";

export default function Page() {
  const [blogState, setBlogState] = useState([]);
  const [heartCount, setheartCount] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [userFavId, setUserFavId] = useState([]);
  const [userId, setUserId] = useState([]);
  const initBlog = async () => {
    try {
      const result = await fetchBlog();
      const userId = await getUserId();
      setUserFavId(result); 
      setBlogState(result);
      setUserId(userId);
      setheartCount(
        result.map((value) =>
          value.attributes.usersFav.data.some((id) => id.id === userId)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleHeartClick = async (index) => {
    const updatedBlogState = [...blogState];
    const updatedheartCount = [...heartCount];
    if (!updatedheartCount[index]) {
      updatedBlogState[index].attributes.heart++;
      setBlogState(updatedBlogState);
    } else {
      updatedBlogState[index].attributes.heart--;
      setBlogState(updatedBlogState);
    }
    console.log(userFavId[index].attributes.usersFav.data); 
    const updateResult = await updateHeartCount(
      updatedBlogState[index].id,
      updatedBlogState[index].attributes.heart,
      userFavId[index].attributes.usersFav.data,
      userId
    );
    if (updateResult === 200) {
      updatedheartCount[index] = !updatedheartCount[index];
      setheartCount(updatedheartCount);
    } else {
      setErrorMessage(updateResult);
    }
  };

  useEffect(() => {
    initBlog();
  }, []);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Feed
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Our team of skilled artists specializes in digital illustrations,
            photo manipulation, and abstract designs. We’re passionate about
            pushing creative boundaries.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-8">
          {blogState.map((datas, index) => (
            <div key={index} className="flex flex-col cursor-pointer">
              <article className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime="2020-03-16" className="text-gray-500">
                    {datas.createDate}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {datas.attributes.prompt}
                  </h3>
                  <img
                    className="mt-2"
                    src={datas.attributes.image.data.attributes.url}
                  />
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {datas.attributes.description}
                  </p>
                  <div className="grid grid-cols-12 gap-3">
                    <button
                      onClick={() => handleHeartClick(index)}
                      className="flex flex-col"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={heartCount[index] ? "red" : "none"}
                        stroke={heartCount[index] ? "red" : "currentColor"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="w-6 h-6"
                        id={`heartIcon${index}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                    <p>{datas.attributes.heart}</p>
                  </div>
                </div>
                <div className="relative mt-2 flex items-center gap-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Michael Foster
                      </a>
                    </p>
                    <p className="text-gray-600">Co-Founder / CTO</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
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
      </div>
    </div>
  );
}
