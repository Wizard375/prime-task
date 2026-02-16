import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/").post(createTask).get(getTasks);

router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
