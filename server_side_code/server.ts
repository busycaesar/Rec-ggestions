// # Importing required libraries

// ## For server
import express, { Application, Request, Response } from "express";
import cors from "cors";

// ## For connecting with DB.
import { connect } from "./Data/mongoDB";

// ## For API routes
import userAPIs from "./APIs/user";

import passport from "./APIs/jwt";

// ## For environment variables
import dotenv from "dotenv";
dotenv.config();

// # Initiating the instance of the express server.
const app: Application = express();

app.use(passport.initialize());

// # Middleware

app.use(express.json());
app.use(cors());

// # Adding API Routes
app.use("/user", userAPIs);

app.get("/", (request: Request, response: Response) => {
  response.status(200).json({ message: "DEv The DEV, DEveloping!" });
});

// # Connecting with the DB and starting the server.
connect()
  ?.then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on ${process.env.PORT}!`)
    )
  )
  .catch((error) =>
    console.log(`There is an error while starting the server: "${error}"!`)
  );
