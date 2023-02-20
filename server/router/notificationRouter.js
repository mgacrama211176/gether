import express from "express";
import {
  addNotif,
  fetchAllNotif,
  updateNotif,
} from "../controller/notificationController.js";

const router = express();

// get all the users from the database
router.post("/addNotif/:selectedId/:userId", addNotif);
router.get("/getNotif/:selectedId", fetchAllNotif);
router.put("/updateNotif/:selectedId", updateNotif);

export default router;
