import { fetchRequest } from "./fetchFunctions";
import { NewUserData, ValidateUserData } from "@/Components";

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

const setToken = (token: string) => {
  sessionStorage.setItem("access_token", token);
};
