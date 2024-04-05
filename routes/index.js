const express = require('express');
const router = express.Router();
const {fechas,fotos,index,login,processLogin,registro,guardarUsuario} = require("../controllers/indexController")
const {admin} = require("../controllers/adminController")

/* Index */
router.get('/', index)
      .get("/registro", registro)
      .post("/registro", guardarUsuario)
      .get("/login", login)
      .post("/login", processLogin)
      .get("/fotos", fotos)
      .get("/fechas", fechas)



/* Admin */
      .get("/admin", admin)


      module.exports = router;