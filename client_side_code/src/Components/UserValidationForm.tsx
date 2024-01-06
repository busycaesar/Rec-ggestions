import React from "react";
import { useForm } from "react-hook-form";
import { ValidateUserData } from "./DataTypes";
import { validateNewUser } from "../../lib/authenticate";

export default function UserRegistrationForm(props: {
  setWarning: any;
  setTitleStatement: any;
}) {
  props.setTitleStatement("Welcome back to give back to the community!");
  const setWarning = props.setWarning,
    { register, handleSubmit } = useForm({
      defaultValues: {
        userName: "",
        password: "",
      },
    }),
    validateUser = async (data: ValidateUserData) => {
      try {
        const response = await validateNewUser(data);
        setWarning(response);
      } catch (error: any) {
        setWarning(error.message);
      }
    };
  return (
    <form onSubmit={handleSubmit(validateUser)}>
      Username <input {...register("userName")} type="text" />
      <br />
      Password <input {...register("password")} type="password" />
      <br />
      <button type="submit">Log In</button>
    </form>
  );
}
