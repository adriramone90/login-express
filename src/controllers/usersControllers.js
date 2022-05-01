const {getUsers, saveUsers} = require("../data/index");

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
            password: req.body.password,
            avatar: req.file ? req.file.filename : "default.png"
        }

        getUsers.push(newUser)

        saveUsers(getUsers)

        res.redirect("/login")

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

