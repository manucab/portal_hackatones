const { v4: uuidv4 } = require('uuid');
const cryptoRandomString = require('crypto-random-string');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `../media`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

 let  upload = multer({storage: storage});

const hackathonStore = async(req, res, next) => {

    let fs = require('fs');
    let uniqueID = uuidv4();
    let stringID = cryptoRandomString({length: 10});
    let dir = '../media/hackathons/' + uniqueID;

    if (!fs.existsSync(dir)){
        // fs.mkdirSync(dir);
        fs.mkdirSync(dir,{recursive:true});
    }

    console.log('entro en changepload');
    let   storage1 = multer.diskStorage({


           destination: function (req, file, cb) {


               cb(null, dir)
           },
           filename: function (req, file, cb) {

        let nameFile = `${stringID}_${file.originalname}`;

        req.pathFile = `/hackathons/${uniqueID}/${nameFile}`;

               cb(null, nameFile);

               console.log('file :>> ', file);
           }
       })
   
    upload.storage = storage1;

    //    console.log(req);
       
       next();
   }


   module.exports = {
    hackathonStore,
    upload
   }