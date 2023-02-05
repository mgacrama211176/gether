import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";

dotenv.config();
const uri = process.env.URI;

export const fetchAllUsers = async (request, response, next) => {
  // connect to DB 1st
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const userId = request.params.userId;
    // const userId = "6b9d03af-e605-45c3-9eab-e5658e52515f";

    //fetch All data from the Database to an Array of objects.

    const data = await users.find({}).toArray();

    const result = data.filter(
      (user) =>
        user.matches && user.matches.some((match) => match.user_id === userId)
    );

    response.status(200).json(result);
  } catch (err) {
    next(err);
  } finally {
    //Close DB after all functions are done.
    await client.close();
  }
};
