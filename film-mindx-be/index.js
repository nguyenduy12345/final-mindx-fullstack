import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import MovieRouter from "./routes/movie.route.js";
import UserRouter from "./routes/user.route.js";

const PORT_DEV = process.env.PORT || 8080;

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", MovieRouter);
app.use("/api/v1", UserRouter);

app.listen(PORT_DEV, (err) => {
  if (err) throw new Error("failed");
  console.log(`server is running ${PORT_DEV}`);
});
