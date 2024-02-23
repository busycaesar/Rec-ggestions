import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Mongo_DB_Connection_String: string =
  process.env.MONGODB_CONNECTION_STRING || "";

let db: Connection;

// This function will connect the backend with the MongoDB.
export const connect = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!Mongo_DB_Connection_String) {
      reject("MongoDB connection string is not provided!");
    }
    db = mongoose.createConnection(Mongo_DB_Connection_String);
    db.on("error", (error) => reject(error));
    db.once("open", () => {
      console.log("Server connected with MongoDB!");
      resolve();
    });
  });
};

// This function will return the MongoDB instance.
export const getDBInstance = () => {
  if (db) return db;
  connect()
    .then(() => db)
    .catch((error) => console.log(error));
};
