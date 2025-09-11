import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path"

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = 3000;
const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://venkatesh-realtime-chat-app.onrender.com"
  ],
  credentials: true,
}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
});
