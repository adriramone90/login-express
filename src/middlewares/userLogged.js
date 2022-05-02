const userLogged = (req,res,next)=>{
    if(req.session.user){
        return res.redirect("/")
    } else {
        next()
    }
}

module.exports = userLogged;