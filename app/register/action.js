"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import axios from "axios";

export async function register(prevState, formData) {
  try {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmpassword");
    const profile = formData.get("profile");
    if (password !== confirmPassword) {
      throw {
        response: {
          data: {
            error: { message: "Passwords do not match" },
          },
        },
      };
    }

    const response = await axios.post(
      `${process.env.STRAPI_BASE_URL}/api/auth/local/register`,
      {
        username,
        email,
        password,
      }
    );

    if (response.data.jwt) {
      console.log("Register Success");
    }
  } catch (error) {
    console.log(error);
    let errorMessage = "";
    if (error.response && error.response.data.error.message) {
      errorMessage = error.response.data.error.message;
    }
    console.log(errorMessage);
    return { message: errorMessage || "Failed to create" };
  }
  redirect("/login");
}
