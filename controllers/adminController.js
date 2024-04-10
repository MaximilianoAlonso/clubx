const fs = require("fs");
const path = require("path");
const { hashSync } = require("bcryptjs");

module.exports = {
  adminLogin: (req, res) => {
    res.render("admin");
  },
  adminProcess: (req, res) => {
    const { identificacion, password } = req.body;

    if (identificacion == "admin" && password == "admin") {
      req.session.userLogin = {
        identificacion,
        password,
      };

      res.cookie("clubx", req.session.userLogin, { maxAge: 1000 * 6000 });

      res.redirect("dashboard");
    } else {
      res.redirect("admin");
    }
  },
  dashboard: (req, res) => {
    res.render("dashboard");
  },
  adminFotos: (req, res) => {
    res.render("formFotos");
  },
  fotosProcess: (req, res) => {
   
    const {
        titulo,
        subtitulo,
        contenido,
        fotos,
        
        
      } = req.body;
  
      let fotosData = JSON.parse(fs.readFileSync("./data/fotos.json", "utf-8"));
      
      // Crear objeto con los datos del artículo
      let nuevoAlbum = {
        id: fotosData.length > 0 ? fotosData[fotosData.length - 1].id + 1 : 1,
        titulo,
        subtitulo,
        contenido,
        fotos:req.files.map(file => file.filename)
      };
  
      // Leer el archivo JSON actual
          fs.readFile("data/fotos.json", "utf8", (err, data) => {
            if (err) {
            console.error(err);
            res.status(500).send("Error interno del servidor");
            return;
             }
  
        let fotosData = JSON.parse(data);
        console.log(req.files && req.files.fotos ? req.files.fotos.map(file=> file.filename) : [])
     // Agregar el nuevo artículo al arreglo
        fotosData.push(nuevoAlbum);
  
     // Escribir los datos actualizados en el archivo JSON
        fs.writeFile(
          "data/fotos.json",
          JSON.stringify(fotosData, null, 2),
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error interno del servidor");
              return;
            }
  
              res.redirect("/dashboard");
          }
        );
      });
    
  },
  adminFechas: (req, res) => {
    res.render("formFechas");
  },
  fechasProcess: (req, res) => {

    const {
      titulo,
      subtitulo,
      contenido,
      fotos,
      
      
    } = req.body;

    let fotosData = JSON.parse(fs.readFileSync("./data/fechas.json", "utf-8"));
    
    // Crear objeto con los datos del artículo
    let nuevoAlbum = {
      id: fotosData.length > 0 ? fotosData[fotosData.length - 1].id + 1 : 1,
      titulo,
      subtitulo,
      contenido,
      fotos:req.files.map(file => file.filename)
    };

    // Leer el archivo JSON actual
        fs.readFile("data/fechas.json", "utf8", (err, data) => {
          if (err) {
          console.error(err);
          res.status(500).send("Error interno del servidor");
          return;
           }

      let fotosData = JSON.parse(data);
      console.log(req.files && req.files.fotos ? req.files.fotos.map(file=> file.filename) : [])
   // Agregar el nuevo artículo al arreglo
      fotosData.push(nuevoAlbum);

   // Escribir los datos actualizados en el archivo JSON
      fs.writeFile(
        "data/fechas.json",
        JSON.stringify(fotosData, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error interno del servidor");
            return;
          }

            res.redirect("/dashboard");
        }
      );
    });
  
},  
};
