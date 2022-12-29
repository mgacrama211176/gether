import { createError } from "../error.js";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.URI;

export const fetchAllUsers = async (request, response, next) => {
  // connect to DB 1st
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    //fetch All data from the Database to an Array of objects.
    const fetchData = await users.find({}).toArray();
    response.status(200).json(fetchData);
  } catch (err) {
    next(err);
  } finally {
    //Close DB after all functions are done.
    await client.close();
  }
};

export const deleteUserController = async (request, response, next) => {
  //get data from the retrieved Json
  // const id = "0e724f9f-ca77-4fe5-8cc5-f63fb37ab30b";
  const id = request.params.UserID;
  //connect to DB 1st
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    console.log(id);
    //search the Id 1st from the Db then delete the selected object.
    const deleteObject = await users.findOneAndDelete({ user_id: id });

    //response the Object after the deletion.
    response.status(200).json(deleteObject);
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
};

export const updateController = async (request, response, next) => {
  //get data from the retrieved Json
  const id = request.params.UserID;
  const password = request.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(id);

  //connect to DB 1st
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    console.log(id);

    // search the Id 1st from the Db then delete the selected object.
    const updateObject = await users.findOneAndUpdate(
      { user_id: id },
      {
        $set: {
          ...request.body,
          hashed_password: hashedPassword,
        },
      },
      { new: true }
    );
    response.status(202).json(updateObject);
    //response the Object after the deletion.
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
};

export const matchedRouter = async (request, response, next) => {
  const user = request.params.id;

  //connect with DB 1st
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const user = request.params.id;
    const fetchData = await users
      .find({ matches: { user_id: user } })
      .toArray();

    response.status(200).json(fetchData);
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
};
