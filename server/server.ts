import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "./Data/mongoDB";
import userAPIs from "./APIs/user";
import cors from "cors";

const app: Application = express();

// Middleware

app.use(express.json());
app.use(cors());

app.use("/user", userAPIs);

// Routes
app.get("/", (request: Request, response: Response) => {
  response.status(200).json({ message: "DEv The DEV, DEveloping!" });
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
