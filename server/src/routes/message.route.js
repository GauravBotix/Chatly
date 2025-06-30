import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getMessages,
  getUserSidebar,
  sendMessages,
} from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/user", auth, getUserSidebar);
messageRouter.get("/:id", auth, getMessages);
messageRouter.post("/send/:id", auth, sendMessages);

export default messageRouter;
