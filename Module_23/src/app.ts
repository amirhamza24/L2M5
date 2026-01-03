import express, { Application } from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  })
);

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === "POST") {
    console.log("Body:", req.body);
  }
  next();
});

app.all("/api/auth/*any", toNodeHandler(auth));

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
