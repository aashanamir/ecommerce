import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/database.js";
import products from "./Routes/productRoute.js";
import users from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// DotEnv Configuration
config({
  path : "./config/config.env"
});

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and other credentials to be sent
  optionsSuccessStatus: 204,
};

connectDb();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static('public'));
// Routes
app.use("/v1/api" ,products);
app.use("/v1/api" ,users);


export default app;