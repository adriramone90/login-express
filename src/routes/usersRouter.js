const express = require("express");
const router = express.Router();

//controllers
const usersControllers = require("../controllers/usersControllers");

//validations
const registerValidator =require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");

router.get("/login", usersControllers.login);

router.post("/login", loginValidator ,usersControllers.processLogin);

router.get("/register", usersControllers.register);

router.post("/register", registerValidator ,usersControllers.processRegister);

router.get("/profile", usersControllers.profile);

router.put("/profile", usersControllers.processProfile);

router.delete("/delete", usersControllers.deleteUser)

module.exports = router