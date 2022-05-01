const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

router.get("/login", usersControllers.login);

router.post("/login", usersControllers.processLogin);

router.get("/register", usersControllers.register);

router.post("/register", usersControllers.processRegister);

router.get("/profile", usersControllers.profile);

router.put("/profile", usersControllers.processProfile);

router.delete("/delete", usersControllers.deleteUser)

module.exports = router