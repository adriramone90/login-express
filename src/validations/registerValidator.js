const{check, body} = require("express-validator");
const {getUsers}= require("../data/index");

const registerValidator = [
    check("name")
                .notEmpty().withMessage("Ingrese su nombre").bail()
                .isLength({max: 15}).withMessage("Ingrese el nombre, sin espacios").bail(),

    check("surname")
    .notEmpty().withMessage("Ingrese su apellido").bail()
    .isLength({max: 15}).withMessage("Ingrese su apellido, sin espacios").bail(),

    body("email").custom(value=>{
        let user = getUsers.find(user=>{
            user.email === value
        })

        if(user){
            return false
        } else{
            return true
        }
    }).withMessage("El email ya se encuentra registrado").bail(),

    check("password")
                .notEmpty().withMessage("Debe ingresar la contraseña").bail()
                .isLength({min:8, max:12}).withMessage("Debe tener como mínimo 8 carácteres").bail(),

    check("password2")
                .notEmpty().withMessage("Debe reingresar su contraseña").bail(),

    body("password2").custom((value, {req})=>{
        if(value !== req.body.password){
            return false
        } else {
            return true
        }
    }).withMessage("Las contraseñas deben coincidir"),

    check("terms")
                .isString("on").withMessage("Debes aceptar los términos y condiciones")
]

module.exports = registerValidator