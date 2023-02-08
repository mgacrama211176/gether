import express from "express";
import {
  fetchAllUsers,
  fetchUsersGenre,
  fetchUsersUsingIdProfile,
} from "../controller/usersController.js";

const router = express();

// get all the users from the database
router.get("/allUsers/:userId", fetchAllUsers);
router.get("/usersById/:userId", fetchUsersUsingIdProfile);
router.get("/genre/:genre/:userId", fetchUsersGenre);

export default router;
