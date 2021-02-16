const express = require('express');
 const   multer = require('multer');

  let  storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../archivos')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });
  let  upload = multer({storage: storage});
    app = express();
    const cors = require("cors");
    app.use(cors());


    const changeUpload = (req, res, next) => {

        var fs = require('fs');
        var dir = '../archivos/mkdir';
        
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        console.log('entro en changepload');
        let   storage1 = multer.diskStorage({
               destination: function (req, file, cb) {
                   cb(null, '../archivos/mkdir')
               },
               filename: function (req, file, cb) {
                   cb(null, file.originalname)
               }
           })
       
        //    upload = multer({storage1});

           console.log(upload.storage = storage1);
           
           next();
       }
       

app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: __dirname })
})

app.post('/upload', changeUpload,upload.single('img'), (req, res) => {
    console.log(req.file) // Nos devuelve un objeto con la información de nuestro archivo
    res.send('Archivo subido correctamente')
})


app.post('/multiple', upload.array('archivo', 2), (req, res) => {
    console.log(req.files)
    res.send('Archivos subidos exitosamente')
})

let dobleInput = upload.fields([{ name: 'archivo', maxCount: 3 }, { name: 'fichero' }])
app.post('/doble-input', dobleInput, (req, res) => {
    console.log(req.files) // Nos devuelve un arreglo de la información de los input
    res.send('Archivos subidos exitosamente')
})

app.listen(3000, () => console.log('SERVIDOR FUNCIONANDO'))