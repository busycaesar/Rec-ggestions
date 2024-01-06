import express, { Request, Response } from "express";
import { registerNewUser, validateUser } from "../Data/userQuery";
import jwt from "jsonwebtoken";
import passport, { jwtOptions } from "./jwt";

const router = express.Router();

router.post("/login", (request: Request, response: Response) => {
  validateUser(request.body)
    .then((user) => {
      let payload = {
          _id: user._id,
          userName: user.userName,
        },
        token = jwt.sign(payload, jwtOptions.secretOrKey);
      response.json({
        message: `${request.body.userName} logged in successfully!`,
        token: token,
      });
    })
    .catch((error) => response.status(422).json({ message: error }));
});

router.post("/register", (request: Request, response: Response) => {
  registerNewUser(request.body)
    .then((message) => response.json({ message: message }))
    .catch((error) => response.status(422).json({ message: error }));
});

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (request: Request, response: Response) => {
    response.json("Dev the Dev!");
  }
);

export default router;
