const express = require("express");
const router = express.Router();

//controllers
const usersControllers = require("../controllers/usersControllers");

//middlewares
const userLogged = require("../middlewares/userLogged");
const uploadAvatar = require("../middlewares/uploadAvatar");

//validations
const registerValidator =require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const profileValidator = require("../validations/profileValidator")

router.get("/login", userLogged,usersControllers.login);

router.post("/login", loginValidator ,usersControllers.processLogin);

router.get("/logout", usersControllers.logout);

router.get("/register", userLogged, usersControllers.register);

router.post("/register", registerValidator ,usersControllers.processRegister);

router.get("/profile", usersControllers.profile);

router.put("/profile" ,uploadAvatar.single("avatar"),profileValidator ,usersControllers.processProfile);

router.delete("/delete", usersControllers.deleteUser)

module.exports = router