import mongoose from "mongoose";
import { getDBInstance } from "./mongoDB";
import bcrypt from "bcryptjs";

// The interface for the user object which will be received from the client side.
interface iUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
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

// This fuction will return the instance of the mongoDB.
const getDB = () => {
  db = getDBInstance();
  if (db) User = db.model("user", userSchema);
};

// This function takes the data of a new uesr and registers the user to the mongoDB.
export const registerNewUser = (newUserData: iUser): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    // Making sure the instance of collection "user" is already present from the DB.
    getDB();
    // Hashing the password, creating a new user object and storing it to the DB.
    bcrypt.hash(newUserData.password, 10).then((hash) => {
      newUserData.password = hash;
      let newUser = User(newUserData);
      newUser
        .save()
        .then(() =>
          resolve(`${newUserData.userName} is successfully registered!`)
        )
        .catch((error: any) => {
          if (error.code == 11000)
            reject(`${newUserData.userName} is already taken!`);
          reject(`There was an error creatring "${newUserData.userName}"`);
        });
    });
  });
};

// This function takes the user data, tries to find the user in the database and returns the information if the data is present in the DB.
export const validateUser = (userData: iUser): Promise<iUser> => {
  return new Promise<iUser>((resolve, reject) => {
    // Making sure the instance of collection "user" is already present from the DB.
    getDB();
    // Looking for the user from the DB using the userName received with the userData.
    User.findOne({ userName: userData.userName })
      .exec()
      .then((user: iUser[]) => {
        // The mongoDB sents back an array type of the users, even if there is only one document from the collection.
        if (user.length == 0) reject(`Unable to find "${userData.userName}"!`);
        else {
          // Once the user is found, making sure that the password is the same as that of the user. Using bcrypt to compare the pain text received during the login and the hashed password store into the DB.
          bcrypt
            .compare(userData.password, user[0].password)
            .then((response) => {
              if (response) resolve(user[0]);
              else reject(`Incorrect password for "${userData.userName}"!`);
            });
        }
      })
      .catch(() => reject(`Unable to find "${userData.userName}"!`));
  });
};
