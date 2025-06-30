import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cors from "cors";
import cookieparser from "cookie-parser";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.status(200).send("hello new request.");
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

connectDb().then(() => {
  server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});
