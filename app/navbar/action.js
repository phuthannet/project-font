"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateLoginStatus() {
  const token = cookies().get("token");
  const username = cookies().get("userName");
  try {
    let res;
    if (token && username) {
      res = { token: token.value, username: username.value };
    }
    return res;
  } catch (error) {
    return error;
  }
}
export async function checkOut() {
  redirect("/login");
}
