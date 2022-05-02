const process = require("process");
require("dotenv").config();
const PORT = process.env.PORT || 3030

//Modules
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const reloginCookie =require("./middlewares/reloginCookie")

//Routes
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter")

//Middlewares
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret: "l09In",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}));
app.use(cookieParser())
app.use(reloginCookie)

//Config ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"))

//Routes middlewares
app.use("/", indexRouter);
app.use("/", usersRouter)

//Local Server
app.listen(PORT, ()=>{
    console.log(`Server listen in port: ${PORT}`)
})