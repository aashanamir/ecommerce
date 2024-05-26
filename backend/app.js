import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/database.js";

import products from "./Routes/productRoute.js";
import users from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";


const app = express();

// DotEnv Configuration
config({
  path : "./config/config.env"
});

connectDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/v1/api" ,products);
app.use("/v1/api" ,users);


export default app;