"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateHeartCount(id, heart, usersFav, userId) {
  try {
    const token = cookies().get("token");
    console.log("usersFav1", usersFav);
    const userExists = usersFav.some((user) => user.id === userId);
    if (userExists) {
      usersFav = usersFav.filter((user) => user.id !== userId);
    } else {
      const newUser = {
        id: userId,
      };
      usersFav.push(newUser);
    }
    const option = {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    };

    if (!token) {
      throw {
        response: {
          data: {
            error: {
              message: "Token not found in cookies",
            },
          },
        },
      };
    }

    const response = await axios.put(
      `${process.env.STRAPI_BASE_URL}/api/histories/${id}?populate=*`,
      {
        data: {
          heart: heart,
          usersFav: usersFav,
        },
      },
      option
    );

    console.log(response.data.data.attributes.usersFav);
    return response.status;
  } catch (error) {
    console.log(error);
    console.log(error.response.data.error.message);
    if (error.response.data.error.message === "Token not found in cookies") {
      redirect("/login");
    }
    return { message: error.response.data.error.message || "Error" };
  }
}

export async function getUserId() {
  const token = cookies().get("token");
  try {
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    const { id } = response.data;
    return id;
  } catch (error) {
    return error;
  }
}

export async function fetchDatas(page) {
  const token = cookies().get("token");
  try {
    const res = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/histories?populate[0]=image&populate[1]=usersFav&populate[2]=createBy.profile&sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=12`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
}
