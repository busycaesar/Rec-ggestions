import React from "react";
import { useForm } from "react-hook-form";
import { NewUserData } from "./DataTypes";
import { registerNewUser } from "../../lib/authenticate";

export default function UserRegistrationForm(props: {
  setWarning: any;
  setTitleStatement: any;
}) {
  props.setTitleStatement(
    "Sign up to suggest the happening places to the community."
  );
  const setWarning = props.setWarning,
    { register, handleSubmit } = useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        password2: "",
      },
    }),
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
  );
}
