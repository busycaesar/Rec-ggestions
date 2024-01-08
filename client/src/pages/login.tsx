import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ValidateUserData } from "../Components/DataTypes";
import { validateNewUser } from "../../lib/authenticate";
import { checkJWT } from "../../lib/authenticate";
import { useRouter } from "next/router";
import Authentication from "@/Components/authentication";

export default function Login() {
  const { register, handleSubmit } = useForm({
      defaultValues: {
        userName: "",
        password: "",
      },
    }),
    router = useRouter(),
    [warning, setWarning] = useState(""),
    validateUser = async (data: ValidateUserData) => {
      try {
        const response = await validateNewUser(data);
        setWarning(response);
        checkJWT()
          .then(() => router.push("/dashboard"))
          .catch((error) => console.log(error));
      } catch (error: any) {
        setWarning(error.message);
      }
    };
  return (
    <Authentication
      warning={warning}
      titleStatement="Welcome back to contribute your valuable insights!"
    >
      <form onSubmit={handleSubmit(validateUser)}>
        Username <input {...register("userName")} type="text" />
        <br />
        Password <input {...register("password")} type="password" />
        <br />
        <button type="submit">Log In</button>
      </form>
    </Authentication>
  );
}
