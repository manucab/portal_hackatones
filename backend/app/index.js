// Instances & variables
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const schedule = require('node-schedule')

const {automaticUpdate} = require('../db/automaticUpdate')

const cors = require("cors");

const{hackathonStore, upload} = require('../middelwares/storageMulter/changeUpload');

const requestId = require('express-request-id')();
const { logger } = require('./config/logger');

const port = process.env.PORT || 3001;
const app = express();

// Routes
const homeRouter = require('../routes/home');
const adminRouter = require('../routes/admin/admin');
const loginRouter = require('../routes/login');
const createHackathonRouter = require('../routes/createHackathon');
const userRouter = require('../routes/user');
const registerRouter = require('../routes/register');
const hackathonRouter = require('../routes/hackathon');
const blogRouter = require('../routes/blog')
const forgotPasswordRouter = require('../routes/forgotPassword')
const infoRouter = require('../routes/info');

//Automatic Update of Database
//Update when running the app
 automaticUpdate()

//Update everyday at 03:00
schedule.scheduleJob('* 01 01 * * *', ()=> automaticUpdate())


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
// for parsing multipart/form-data
// app.use(upload.array());
app.use(requestId);
app.use(logger.requests);

// Endpoints
// Home
app.use('/', homeRouter);
// Admin
app.use('/admin', adminRouter);
// Info
app.use('/info', infoRouter);
// Login
app.use('/login', loginRouter);
// Register
app.use('/register', registerRouter);
// Hackathon
app.use('/hackathon', hackathonRouter);

// app.post('/hackathon/id/comments', isAuthenticated, postComment); // Publicar comentario
// app.post('/hackathon/id/comments/id', isAuthenticated, isRightUser, modifyComment); // Modificar comentario

// Create Hackathon Page
app.use('/createhackathon', hackathonStore,  upload.single('cover_picture'),createHackathonRouter);

//// ********************************
//User -> validate account
app.use('/user', userRouter);
app.use('/blog', blogRouter)
app.use('/forgot-password', forgotPasswordRouter)

app.use('/static', express.static('../media'));


// **** Router not found ****
// No router found handler
app.use((req, res, next) => {

    next({
        message: 'Router not found',
        statusCode: 404,
        level: 'warn',
    });


});

app.use((err, req, res, next) => {

    const { message, statusCode = 500, level = 'error' } = err;
    // const log = `${logger.header(req)} ${statusCode} ${message}`;
    const log = `${statusCode} ${message}`;

    logger[level](log);

    res.status(statusCode);
    res.json({ message });

});



app.listen(port, err => {
    if (err) {
        return logger.error('ERROR', err);
    }
    logger.info(`listening on port ${port}`);

    /*
      let messageListen = (err) ? `Error, $ {err}` : `listening on port ${port}`;
     return console.log(messageListen);
      */
})
