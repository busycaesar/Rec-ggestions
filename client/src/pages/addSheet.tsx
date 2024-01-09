import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

export default function AddSheet() {
  const { register, handleSubmit } = useForm({
      defaultValues: {
        title: "",
        sheet: "",
      },
    }),
    addSheetPost = (data: any) => {
      console.log(data);
    };
  return (
    <>
      <form onSubmit={handleSubmit(addSheetPost)}>
        Title <input type="text" {...register("title")} />
        <br /> <br />
        Sheet
        <textarea type="textbox" rows="10" cols="100" {...register("sheet")} />
        <br /> <br />
        <Button type="submit">Add Sheet</Button>
      </form>
    </>
  );
}
