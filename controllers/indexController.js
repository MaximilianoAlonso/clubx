const fs = require('fs');
const uuid = require('uuid').v4;
const qr = require('qrcode');
const path = require('path');

const qrDataFilePath = path.join(__dirname, '../data/qr.json');


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
      return data.map((record) => ({
        ...record,
        fotos: [record.fotos[0]], // Mantener solo la primera foto
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

    res.render("index", {
      fechasData: formattedData,
      fotosData,
    });
  },
  fotos: (req, res) => {
    let fotosData = JSON.parse(fs.readFileSync("./data/fotos.json", "utf-8"));

    res.render("fotos", {
      fotosData,
    });
  },
  todasLasFotos: (req, res) => {
    let fotosData = JSON.parse(fs.readFileSync("./data/fotos.json", "utf-8"));
    let id = req.params.id;
    let detalle = fotosData.find((a) => a.id == id);
    res.render("detailFoto", {
      ...detalle,
    });
  },
  fechas: (req, res) => {
    let fechasData = JSON.parse(fs.readFileSync("./data/fechas.json", "utf-8"));

    res.render("fechas", {
      fechasData,
    });

    res.render("fechas");
  },
  todasLasFechas: (req, res) => {
    let fotosData = JSON.parse(fs.readFileSync("./data/fechas.json", "utf-8"));
    let id = req.params.id;
    let detalle = fotosData.find((a) => a.id == id);
    res.render("detailFechas", {
      ...detalle,
    });
  },
  crearQr: (req, res) => {
    res.render("qr/generarQr");
  },

  guardarQr: (req, res) => {
    const { nombre, apellido, telefono, email, descripcion } = req.body;
  
    // Generar ID único
    const id = uuid().replace(/-/g, '').substr(0, 12);
  
    // Crear objeto con los datos del formulario
    const qrData = {
      id,
      nombre,
      apellido,
      telefono,
      email,
      descripcion,
      estado: 'ACTIVO'
    };
  
    // Leer datos existentes del archivo JSON
    let qrDataArray = [];
    try {
      qrDataArray = JSON.parse(fs.readFileSync(qrDataFilePath));
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
    }
  
    // Agregar nuevo objeto al array
    qrDataArray.push(qrData);
  
    // Guardar el array actualizado en el archivo JSON
    try {
      fs.writeFileSync(qrDataFilePath, JSON.stringify(qrDataArray, null, 2));
    } catch (error) {
      console.error('Error al escribir en el archivo JSON:', error);
    }
  
    // Generar código QR en formato vCard
    const vCardData = `http://localhost:3000/dashboard/verificar/${id}`
  
    const qrCodeFilename = `qr_${id}.png`;
    const qrCodePath = path.join(__dirname, `../public/images/qrCodes/${qrCodeFilename}`);
  
    qr.toFile(qrCodePath, vCardData, (err) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
        res.status(500).send('Error al generar el código QR');
      } else {
        // Enviar los datos del archivo QR al cliente
        res.setHeader('Content-Type', 'image/png');
        res.download(qrCodePath, qrCodeFilename);
      }
    });
  },
  verificarQr: (req, res) => {
    const id = req.params.id;

    fs.readFile(qrDataFilePath, (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).send('Error al leer el archivo JSON');
        return;
      }

      const qrDataArray = JSON.parse(data);

      const qrData = qrDataArray.find((item) => item.id === id);

      if (!qrData) {
        res.status(404).send('No se encontró el QR correspondiente');
        return;
      }

      res.render("qr/verificar", { ...qrData });
    });
  },

  modificarQr: (req, res) => {
    const id = req.params.id;

    const { nombre, apellido, telefono, email, descripcion } = req.body;

    fs.readFile(qrDataFilePath, (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).send('Error al leer el archivo JSON');
        return;
      }

      let qrDataArray = JSON.parse(data);

      const index = qrDataArray.findIndex((item) => item.id === id);

      if (index === -1) {
        res.status(404).send('No se encontró el QR correspondiente');
        return;
      }

      qrDataArray[index] = {
        id,
        nombre,
        apellido,
        telefono,
        email,
        descripcion,
        estado: 'CADUCADO'
      };

      fs.writeFile(qrDataFilePath, JSON.stringify(qrDataArray, null, 2), (err) => {
        if (err) {
          console.error('Error al escribir en el archivo JSON:', err);
          res.status(500).send('Error al escribir en el archivo JSON');
          return;
        }

        res.redirect(`/dashboard/verificar/${id}`);
      });
    });
  }
  
}   