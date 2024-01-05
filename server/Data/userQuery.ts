import mongoose from "mongoose";
import { getDBInstance } from "./mongoDB";

// The interface for the user object which will be received from the client side.
interface iUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password2: string;
}

let MongoDB_Schema = mongoose.Schema,
  userSchema = new MongoDB_Schema({
    firstName: String,
    lastName: String,
    userName: {
      type: String,
      unique: true,
    },
    password: String,
  }),
  User: any,
  db;

const getDB = () => {
  db = getDBInstance();
  if (db) User = db.model("user", userSchema);
};

export const registerNewUser = (newUserData: iUser): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (newUserData.password != newUserData.password2)
      reject("Passwords doesn't match!");
    getDB();
    let newUser = User(newUserData);
    newUser
      .save()
      .then(() =>
        resolve(`${newUserData.userName} is successfully added to the DB!`)
      )
      .catch((error: any) => {
        if (error.code == 11000) reject("Username is already taken!");
        reject(`There was an error creatring the user ${newUserData.userName}`);
      });
  });
};

export const validateUser = (userData: iUser): Promise<iUser> => {
  return new Promise<iUser>((resolve, reject) => {
    getDB();
    User.findOne({ userName: userData.userName })
      .exec()
      .then((user: iUser) => {
        if (user.password == userData.password) resolve(user);
        else reject(`Incorrect password for the user ${userData.userName}!`);
      })
      .catch((error: any) =>
        reject(`Unable to find the user ${userData.userName}!`)
      );
  });
};