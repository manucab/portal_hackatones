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

    let   storage1 = multer.diskStorage({

           destination: function (req, file, cb) {
               cb(null, dir)
           },
           filename: function (req, file, cb) {

        let nameFile = `${stringID}_${file.originalname}`;
        console.log(file)
        req.pathFile = `/hackathons/${uniqueID}/${nameFile}`;
        req.nameDirHackathon = dir;

               cb(null, nameFile);

           }
       })
   
    upload.storage = storage1;

       next();
   }


const userStore = async(req, res, next) => {

    let fs = require('fs');
    let uniqueID = uuidv4();
    let stringID = cryptoRandomString({length: 10});
    let dir = '../media/users/' + uniqueID;

    if (!fs.existsSync(dir)){
        // fs.mkdirSync(dir);
        fs.mkdirSync(dir,{recursive:true});
    }

    let   storage2 = multer.diskStorage({

           destination: function (req, file, cb) {
               cb(null, dir)
           },
           filename: function (req, file, cb) {
        
        let nameFile = `${stringID}_${file.originalname}`
        req.pathFile = `/users/${uniqueID}/${nameFile}`;
        req.nameDirUser = dir;
        console.log('Upload>>>',req.pathFile)


               cb(null, nameFile);

           }
       })
       

    upload.storage = storage2;

       next();
   }


   module.exports = {
    hackathonStore,
    userStore,
    upload
   }