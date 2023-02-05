import express from "express";
import { fetchAllUsers } from "../controller/usersController.js";

const router = express();

// get all the users from the database
router.get("/allUsers/:userId", fetchAllUsers);

export default router;
