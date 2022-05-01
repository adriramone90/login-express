const {getUsers, saveUsers} = require("../data/index");

const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs")

module.exports = {
    login: (req,res)=>{
        res.render("users/login")
    },

    processLogin: (req,res) =>{
        
    },

    register: (req,res) =>{
        res.render("users/register")
    },

    processRegister: (req, res)=>{
        
        errors = validationResult(req);

        if(errors.isEmpty()){
            let lastId = 0;

            getUsers.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });

            let newUser = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,12),
                avatar: req.file ? req.file.filename : "default.png"
            }

            getUsers.push(newUser)

            saveUsers(getUsers)

            res.redirect("/login")
        } else {
            res.render("users/register",{
                errors: errors.mapped(),
                old:req.body
            })
        }


        

    },

    profile:(req,res)=>{
        //vista perfil
    },

    processProfile: (req,res)=>{
        //modificar perfil
    },

    deleteUser:(req,res)=>{

    }


}

