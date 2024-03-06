"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import axios from "axios";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await axios.post(
      `${process.env.STRAPI_BASE_URL}/api/auth/local`,
      {
        identifier: email,
        password,
      }
    );
    if (response.data.jwt) {
      cookies().set("token", response.data.jwt);
      cookies().set("userName", response.data.user.username);
    }
  } catch (error) {
    let errorMessage = "";
    if (error.response && error.response.data.error.message) {
      errorMessage = error.response.data.error.message;
    }
    return { message: errorMessage || "Failed to create" };
  }
  return new redirect("/");
}
