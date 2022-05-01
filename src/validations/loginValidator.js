const {check, body}=require("express-validator");
const {getUsers} = require("../data/index");
const bcrypt = require("bcryptjs")

let loginValidator = [
    check("email")
                .notEmpty().withMessage("Campo requerido")
                .isEmail().withMessage("Ingrese un mail válido").bail(),

    body("custom").custom((value,{req})=>{
        let user = getUsers.find(user => user.email === req.body.email)

        if(bcrypt.compareSync(req.body.password, user.password)){
            return true
        } 
            return false
        
    }).withMessage("Email o contraseña incorrecta").bail(),

    check("password")
                .notEmpty().withMessage("Ingrese su contraseña").bail()
]

module.exports = loginValidator