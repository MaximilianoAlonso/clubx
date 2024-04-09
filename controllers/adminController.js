const fs = require('fs');
const path = require('path');
const {hashSync} = require('bcryptjs')


module.exports = {
    admin: (req,res) => {
        res.render("admin")
    },
    adminProcess: (req,res) => {
        const { identificacion, password } = req.body;

        if (identificacion == "admin" && 
            password == "admin") {
            req.session.userLogin = {
                identificacion,
                password,
            };
            
                res.cookie('clubx', req.session.userLogin, { maxAge: 1000 * 6000 });
            
            res.redirect("dashboard");
        } else {
           
            res.redirect("admin");
        }
    },
    dashboard: (req,res) => {

        res.render("dashboard")
    }
    
    
}