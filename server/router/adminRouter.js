import express from "express";
import {
  fetchAllUsers,
  deleteUserController,
  updateController,
  matchedRouter,
} from "../controller/adminController.js";

const router = express();

// get all the users from the database
router.get("/getUsers", fetchAllUsers);

// delete the user._id that has been selected
router.delete("/deleteUser/:UserID", deleteUserController);

//Update information for specific User.id
router.put("/updateUser/:UserID", updateController);

router.get("/matched/:id", matchedRouter);

export default router;
