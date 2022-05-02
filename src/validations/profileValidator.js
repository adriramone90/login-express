const{check, body} = require("express-validator");
const {getUsers}= require("../data/index");

const profileValidator = [
    check("name")
                .notEmpty().withMessage("Ingrese su nombre").bail()
                .isLength({max: 15}).withMessage("Ingrese el nombre, sin espacios").bail(),

    check("surname")
    .notEmpty().withMessage("Ingrese su apellido").bail()
    .isLength({max: 15}).withMessage("Ingrese su apellido, sin espacios").bail(),

    check("password")
                .isLength({min:8, max:12}).withMessage("Debe tener como mínimo 8 carácteres").bail(),


    body("password2").custom((value, {req}) => {
        if(value !== req.body.password){
            return false
        } else {
            return true
        }
    }).withMessage("Las contraseñas deben coincidir"),

    //body("avatar").custom((value, {req})=>{
       // if(value !== req.file.mimetype)
    //})
]

module.exports = profileValidator