import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "./Data/mongoDB";
import { registerNewUser } from "./Data/userDataQuery";

const app: Application = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.send("DEv The DEV, DEveloping!");
});

app.post("/user", (request: Request, response: Response) => {
  registerNewUser(request.body)
    .then((message) => response.json(message))
    .catch((error) => response.status(422).json({ Error: error }));
});

connect()
  ?.then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on ${process.env.PORT}!`)
    )
  )
  .catch((error) =>
    console.log(`There is an error while starting the server: "${error}"!`)
  );
