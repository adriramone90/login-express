const {getUsers, saveUsers} = require("../data/index");

const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs")

module.exports = {
    login: (req,res)=>{
        res.render("users/login",{
            titulo:"Iniciar Sesión",
            session:req.session
        })
    },

    processLogin: (req,res) =>{
        
        let errors = validationResult(req);

        if(errors.isEmpty()){
            
            let user = getUsers.find((user) => {
                return user.email === req.body.email
            })

            

            req.session.user = {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                surname: user.surname
            }
            

            if(req.body.remember){
                const TIME_COOKIE = 60000 * 5;

                res.cookie("userLogin", req.session.user,{
                    expires: new Date(Date.now() + TIME_COOKIE),
                    httpOnly: true,
                    secure: true
                })
            }

            res.locals.user = req.session.user

            res.redirect("/")
        } else {
            
            res.render("users/login",{
                titulo:"Iniciar Sesión",
                errors:errors.mapped(),
                old: req.body,
                session:req.session
            })
            
        }
    },

    register: (req,res) =>{
        res.render("users/register",{
            titulo:"Registrarme",
            session:req.session
        })
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
                titulo:"Registrarme",
                errors: errors.mapped(),
                old:req.body,
                session:req.session
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

