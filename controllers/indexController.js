const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');

module.exports = {
  index: (req, res) => {
    const getLastThreeRecords = (data) => {
      // Ordenar los registros por ID de forma descendente
      const sortedData = data.sort((a, b) => b.id - a.id);
      // Obtener los últimos 3 registros
      return sortedData.slice(0, 3);
    };
    
    const getFirstPhotoOfEachRecord = (data) => {
      // Obtener solo la primera foto de cada registro
      return data.map(record => ({
        ...record,
        fotos: [record.fotos[0]]  // Mantener solo la primera foto
      }));
    };
    
    const getFormattedData = (fechasData, fotosData) => {
      // Obtener los últimos 3 registros
      const lastThreeRecords = getLastThreeRecords(fechasData);
      // Obtener solo la primera foto de cada registro
      const formattedRecords = getFirstPhotoOfEachRecord(lastThreeRecords);
      return formattedRecords;
    };
    let fechasData = JSON.parse(fs.readFileSync("./data/fechas.json", "utf-8"));
    let fotosData = JSON.parse(fs.readFileSync("./data/fotos.json", "utf-8"));

    let formattedData = getFormattedData(fechasData, fotosData);

    res.render("index",{
      fechasData: formattedData,
      fotosData
    });
    
  },
  fotos: (req, res) => {
    let fotosData = JSON.parse(fs.readFileSync("./data/fotos.json", "utf-8"));

    res.render("fotos",{
      fotosData
    });
  },
  todasLasFotos: (req,res) => {
    let fotosData = JSON.parse(fs.readFileSync("./data/fotos.json", "utf-8"));
    let id = req.params.id
    let detalle = fotosData.find(a => a.id == id)
    res.render("detailFoto",{
      ...detalle
    });
  },
  fechas: (req, res) => {
    let fechasData = JSON.parse(fs.readFileSync("./data/fechas.json", "utf-8"));

    res.render("fechas",{
      fechasData
    });

    res.render("fechas");
  },
  todasLasFechas: (req,res) => {
    let fotosData = JSON.parse(fs.readFileSync("./data/fechas.json", "utf-8"));
    let id = req.params.id
    let detalle = fotosData.find(a => a.id == id)
    res.render("detailFechas",{
      ...detalle
    });
  },
  generarQR: (req,res) => {
    const qr = require('qrcode');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Genera un UUID único
const id = uuidv4().split('-')[0];

// Texto o URL que quieres codificar en el QR, incluyendo el ID
const data = 'https://localhost:3000/verificado/' + id;

// Opciones para el tamaño y calidad del QR
const options = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
        dark: '#000000',   // Color oscuro del QR
        light: '#FFFFFF'   // Color claro del QR
    }
};

// Genera el QR y guarda en un archivo
qr.toFile(`./qr${id}.png`, data, options, function (err) {
    if (err) throw err;
    console.log('QR generado correctamente.');
});

  },
  verificarQr: (req,res) => {
    res.render("veriicar")
  }

};
