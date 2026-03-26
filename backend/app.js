const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
 }));

app.use(express.json());
app.use(cookieParser());  
 

const authuser = require("./routes/authRoute");
const authRouteFdPt = require("./routes/authRouteFdPt");
const foodRoute=require("./routes/foodRoute");


app.use("/api/user", authuser);
app.use("/api/foodpartner", authRouteFdPt);
app.use("/api/food", foodRoute);

module.exports = app;
