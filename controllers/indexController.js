module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  fotos: (req, res) => {
    /* COMPLETAR */

    res.render("fotos");
  },
  fechas: (req, res) => {
    /* COMPLETAR */

    res.render("fechas");
  },
  registro: (req, res) => {
    /* COMPLETAR */

    res.render("registro");

  },
  guardarUsuario: (req, res) => {
    /* COMPLETAR */

    res.redirect("login");
  },
  
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    /* COMPLETAR */

    res.render("perfil");
  },
};
