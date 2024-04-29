const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkUser = require("../middlewares/checkUser");
const checkAdmin = require("../middlewares/checkAdmin");

const {
  fechas,
  fotos,
  index,
  todasLasFotos,
  todasLasFechas,
  crearQr,
  guardarQr,
  modificarQr,
  verificarQr
} = require("../controllers/indexController");
const {
  registro,
  guardarUsuario,
  login,
  processLogin,
  perfil,
  logOut,
  
} = require("../controllers/userController");
const {
  adminLogin,
  adminProcess,
  dashboard,
  adminFechas,
  fotosProcess,
  adminFotos,
  fechasProcess,

} = require("../controllers/adminController");

/* ---------------------- MULTER ----------------------- */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router

  /*--------------------- INDEX --------------------- */
  .get("/", index)
  .get("/registro", registro)
  .get("/login", login)
  .get("/fotos", fotos)
  .get("/fechas", fechas)

  /*--------------------- USERS ---------------------*/
  .post("/registro", guardarUsuario)
  .post("/login", processLogin)
  .get("/perfil", checkUser, perfil)
  .get("/logOut", logOut)

  /*--------------------- ADMIN ---------------------*/
  .get("/admin", adminLogin)
  .get("/dashboard", checkAdmin, dashboard)
  .post("/admin", adminProcess)

  .get("/formFechas", checkAdmin, adminFechas)
  .post("/formFechas", upload.array("fotos", 10), fechasProcess)
  .get("/detailFechas/:id", todasLasFechas)

  .get("/formFotos", checkAdmin, adminFotos)
  .post("/formFotos", upload.array("fotos", 30), fotosProcess)
  .get("/detailFoto/:id", todasLasFotos)

  /*--------------------- QR ---------------------*/
  .get("/dashboard/generarQr", crearQr)
  .post("/dashboard/generarQr", guardarQr)
  .get("/dashboard/verificar/:id?", verificarQr)
  .post("/dashboard/verificar/:id", modificarQr)
module.exports = router;
