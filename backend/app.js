const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://foodi-khaki.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());  
 

const authuser = require("./routes/authRoute");
const authRouteFdPt = require("./routes/authRouteFdPt");
const foodRoute=require("./routes/foodRoute");


app.use("/api/user", authuser);
app.use("/api/foodpartner", authRouteFdPt);
app.use("/api/food", foodRoute);

module.exports = app;
