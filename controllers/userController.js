
const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');

module.exports = {
guardarUsuario: (req, res) => {
    const {nombre,apellido,email,telefono, password,identiicacion} = req.body;
     
    const newUser = {
     id: users.length ? users[users.length - 1].id + 1 : 1,
     nombre:nombre,
     apellido:apellido,
     email:email,
     telefono:telefono,
     identiicacion:identiicacion,
     password:password
    }
    
    users.push(newUser)
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 3), 'utf-8')
    
    res.redirect("/login");
   },
   
   login: (req, res) => {
     res.render("login");
   },
  
    processLogin : (req, res) => {
       
       const usersAll = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
       const user = usersAll.find(user => user.identificacion == req.body.identificacion);
       
       if (user && user.password == req.body.password) {
           req.session.userLogin = {        
               id: user.id,
               name: user.name
           };
           res.cookie('clubx', req.session.userLogin, { maxAge: 1000 * 600 }); 
           res.redirect("/perfil"); 
       } else {
           res.send('ERROR'); 
       }
   },
   perfil: (req,res)=>{
    const usersAll = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
       const user = usersAll.find(user => user.identificacion == req.body.identificacion);
       
    res.render("perfil", {
      ...user
    })
  },
  registro: (req, res) => {
    /* COMPLETAR */

    res.render("registro");

  },
  logOut:(req,res)=>{
    req.session.destroy();
    return res.redirect('/')
},

}