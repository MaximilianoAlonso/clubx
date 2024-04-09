const express = require("express");
const router = express.Router();
const {
  fechas,
  fotos,
  index,
  verificarQr
  /*  verificarQr, */
} = require("../controllers/indexController");
const {
  registro,
  guardarUsuario,
  login,
  processLogin,
  perfil,
  logOut
} = require("../controllers/userController");
const {
  admin,
  adminProcess,
  dashboard,
} = require("../controllers/adminController");
const checkUser = require("../middlewares/checkUser");
const checkAdmin = require("../middlewares/checkAdmin");


router
/* Index */
  .get("/", index)
  .get("/registro", registro)
  .get("/login", login)
  .get("/fotos", fotos)
  .get("/fechas", fechas)

/* users */
  .post("/registro", guardarUsuario)
  .post("/login", processLogin)
  .get("/perfil", checkUser, perfil)
  .get('/logOut', logOut)

  /* Admin */
  .get("/admin", admin)
  .post("/admin", adminProcess)
  .get("/dashboard", checkAdmin, dashboard)

 /* QR */ 
   
 .get("/verificar/:id", verificarQr);

module.exports = router;
