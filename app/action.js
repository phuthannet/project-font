"use server";
import axios from "axios";
import { cookies } from "next/headers";
export async function updateHeartCount(id, heart) {
  try {
    const token = cookies().get("token");
    if (!token) {
      throw new Error("Token not found in cookies");
    }
    const response = await axios.put(
      `${process.env.STRAPI_BASE_URL}/api/histories/${id}`,
      {
        data: {
          heart: heart,
        },
      }
    );
    if (response.status === 200) {
      console.log("update heart success");
    } else {
      console.log("update heart fail");
    }
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error.message;
  }
}
