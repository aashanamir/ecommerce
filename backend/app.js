import express from "express";
import { config } from "dotenv";
import products from "./Routes/productRoute.js";
import { connectDb } from "./config/database.js";
import ErrorMiddleware from "./utils/erroMiddleware.js";
const app = express();

// DotEnv Configuration
config({
  path : "./config/config.env"
});

connectDb();

// Middlewares
app.use(express.json());
// Routes
app.use("/v1/api" ,products);


export default app;