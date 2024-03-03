"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {STRAPI_BASE_URL_CONFIG} from "./config/config"

export async function updateHeartCount(id, heart, usersFav, userId) {
  try {
    const token = cookies().get("token");
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
          usersFav: {
            data: [
              {
                id: userId,
              },
            ],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    
    console.log(response.data.data.attributes.usersFav);
    if (response.status === 200) {
      console.log("update heart success");
    } else {
      console.log("update heart fail");
    }
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.error.message);
    // if (error.response.data.error.message === "Token not found in cookies") {
    //   redirect("/login");
    // }
    // return { message: error.response.data.error.message || "Error" };
  }
}

export async function getUserId() {
  const token = cookies().get("token");
  try {
    const response = await axios.get((STRAPI_BASE_URL_CONFIG)+'/api/users/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const { id } = response.data;
    return id;
  } catch (error) {
    return error;
  }
}

export async function fetchBlog() {
  const token = cookies().get("token");
  try {
    const res = await axios.get(
      (STRAPI_BASE_URL_CONFIG +'/api/histories?populate=*'),
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
}
