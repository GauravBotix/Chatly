import { Router } from "express";
import {
  checkUser,
  login,
  logout,
  signup,
  uploadProfilePic,
} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get("/logout", auth, logout);
authRouter.put("/upload-profile", auth, uploadProfilePic);
authRouter.get("/check_user", auth, checkUser);

export default authRouter;
