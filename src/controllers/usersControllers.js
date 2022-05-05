const {getUsers, saveUsers} = require("../data/index");

const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");
const { get } = require("express/lib/response");

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
                surname: user.surname,
                
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
                avatar: req.file ? req.file.filename : "default.jpg"
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

    logout:(req,res)=>{
        req.session.destroy();

        if(req.cookies.userLogin){
            res.cookie("userLogin","",{
                maxAge: -1
            })
        }

        res.redirect("/")
    },

    profile:(req,res)=>{
        let user = getUsers.find(user => user.email === req.session.user.email)

        res.render("users/profile",{
            titulo:"Registrarme",
            session:req.session,
            user:user
        })
    },

    processProfile: (req,res)=>{

        let errors = validationResult(req)

        if(errors.isEmpty()){

            getUsers.forEach(user => {
                if(user.email === req.session.user.email){
                    user.name = req.body.name ? req.body.name : user.name
                    user.surname = req.body.surname ? req.body.surname : user.surname
                    user.birthday = req.body.birthday
                    user.password = req.body.password ? bcrypt.hashSync(req.body.password,12) : user.password
                    user.avatar = req.file ? req.file.filename : user.avatar
                }
            })
    
            saveUsers(getUsers)
    
            res.redirect("/")
        } else{

            let user = getUsers.find(user => user.email === req.session.user.email)

            res.render("users/profile",{
                titulo:"Registrarme",
                session:req.session,
                user:user,
                errors:errors.mapped()
            })
        }

        
    },

    deleteUser:(req,res)=>{
        let locateUser = getUsers.find(user => user.email === req.session.user.email)


        getUsers.forEach(user => {
            if(user.id === locateUser.id){

                userDelete = getUsers.indexOf(user)

                getUsers.splice(userDelete, 1)
            }
        })

        saveUsers(getUsers)

        req.session.destroy();
        if(req.cookies.userLogin){
            res.cookie("userLogin","",{
                maxAge: -1
            })
        }

        res.redirect("/")
    }


}

