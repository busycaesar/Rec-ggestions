import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NewUserData } from "../Components/DataTypes";
import { registerNewUser } from "../../lib/authenticate";
import Authentication from "@/Components/authentication";

export default function Register() {
  const { register, handleSubmit } = useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        password2: "",
      },
    }),
    [warning, setWarning] = useState(""),
    registerUser = async (data: NewUserData) => {
      if (data.password != data.password2)
        return setWarning("passwords dont match");
      try {
        const response = await registerNewUser(data);
        setWarning(response);
      } catch (error: any) {
        setWarning(error.message);
      }
    };
  return (
    <Authentication
      warning={warning}
      titleStatement="Welcome to the community of explorers!"
    >
      <form onSubmit={handleSubmit(registerUser)}>
        First Name
        <input {...register("firstName")} type="text" /> <br />
        Last Name <input {...register("lastName")} type="text" />
        <br />
        Username <input {...register("userName")} type="text" />
        <br />
        Password <input {...register("password")} type="password" />
        <br />
        Confirm Password
        <input {...register("password2")} type="password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </Authentication>
  );
}
