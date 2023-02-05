import express from "express";
import {
  fetchAllUsers,
  forgotPassController,
} from "../controller/validationController.js";

const router = express();

// get all the users from the database
router.get("/getUsers/:param", fetchAllUsers);
router.put("/forgotPass", forgotPassController);

export default router;
