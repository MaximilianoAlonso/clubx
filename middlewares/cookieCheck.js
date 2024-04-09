module.exports = (req,res,next) => {
    if(req.cookies.clubx){
        req.session.userLogin = req.cookies.clubx
    }
    next()
}