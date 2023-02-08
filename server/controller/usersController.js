import { MongoClient } from "mongodb";
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
    const userId = request.params.userId;
    const genre = "RPG";

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

export const fetchUsersGenre = async (request, response, next) => {
  // connect to DB 1st
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const genre = request.params.genre;
    const userId = request.params.userId;

    //fetch All data from the Database to an Array of objects.

    const data = await users.find({ genre: genre }).toArray();
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

export const fetchUsersUsingIdProfile = async (request, response, next) => {
  // connect to DB 1st
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const userId = request.params.userId;

    //fetch All data from the Database to an Array of objects.

    const data = await users.find({ user_id: userId }).toArray();

    response.status(200).json(data);
  } catch (err) {
    next(err);
  } finally {
    //Close DB after all functions are done.
    await client.close();
  }
};
