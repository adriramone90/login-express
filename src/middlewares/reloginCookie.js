const reloginCookie = (req, res, next)=>{
    if(req.cookies.userLogin){
        req.session.user = req.cookies.userLogin;
        res.locals.user = req.session.user
    }

    next()
}

module.exports = reloginCookie;