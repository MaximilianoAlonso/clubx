const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');

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
