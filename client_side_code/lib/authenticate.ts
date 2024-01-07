import { fetchRequest } from "./fetchFunctions";
import { NewUserData, ValidateUserData } from "@/Components";
import { jwtDecode } from "jwt-decode";

export const registerNewUser = async (newUserData: NewUserData) => {
  const body = {
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      userName: newUserData.userName,
      password: newUserData.password,
    },
    res = await fetchRequest(
      `${process.env.NEXT_PUBLIC_USER_API}/user/register`,
      "POST",
      body
    ),
    data = await res.json();
  if (res.status === 200) {
    setToken(data.message);
    return data.message;
  } else throw new Error(data.message);
};

export const validateNewUser = async (newUserData: ValidateUserData) => {
  const body = {
      userName: newUserData.userName,
      password: newUserData.password,
    },
    res = await fetchRequest(
      `${process.env.NEXT_PUBLIC_USER_API}/user/login`,
      "POST",
      body
    ),
    data = await res.json();
  if (res.status === 200) {
    setToken(data.token);
    return data.message;
  } else throw new Error(data.message);
};

export const checkJWT = async () => {
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/user/dashboard`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${getToken()}`,
        },
      }
    ),
    data = await res.json();
  if (res.status === 200) {
    return data.message;
  } else throw new Error(data.message);
};

const setToken = (token: string) => {
  sessionStorage.setItem("access_token", token);
};

export const getToken = () => {
  try {
    return sessionStorage.getItem("access_token");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
