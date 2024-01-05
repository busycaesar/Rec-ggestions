import express, { Request, Response } from "express";
import { registerNewUser, validateUser } from "../Data/userQuery";

const router = express.Router();

router.post("/login", (request: Request, response: Response) => {
  validateUser(request.body)
    .then((message) =>
      response.json({
        message: `${request.body.userName} logged in successfully!`,
      })
    )
    .catch((error) => response.status(422).json({ Error: error }));
});

router.post("/register", (request: Request, response: Response) => {
  registerNewUser(request.body)
    .then((message) => response.json(message))
    .catch((error) => response.status(422).json({ Error: error }));
});

export default router;
