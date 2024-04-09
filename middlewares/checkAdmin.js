module.exports = (req, res, next) =>{

    if (req.session.userLogin && req.session.userLogin.identificacion === "admin") {
         next()
    }
    return res.redirect("/admin")
}