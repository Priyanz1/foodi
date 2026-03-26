const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin:"https://foodi-khaki.vercel.app" || "https://foodi-git-main-priyanz1s-projects.vercel.app"|| "https://foodi-qwp866t7t-priyanz1s-projects.vercel.app",
    credentials: true
 }));

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
