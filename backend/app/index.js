// Instances & variables
require('dotenv').config();
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();
const cors = require("cors");
const express = require("express");
const requestId = require('express-request-id')();
const { logger } = require('./config/logger');

const port = process.env.PORT || 4444;
const app = express();

// Routes
const homeRouter = require('../routes/home');
const adminRouter = require('../routes/admin/admin');
const loginRouter = require('../routes/login');
const createHackathonRouter = require('../routes/createHackathon');
const userRouter = require('../routes/user');
const registerRouter = require('../routes/register');
const hackathonRouter = require('../routes/hackathon');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
// for parsing multipart/form-data
app.use(upload.array());
app.use(requestId);
app.use(logger.requests);

// Endpoints
// Home
app.use('/', homeRouter);
// Admin
app.use('/admin', adminRouter);
// Login
app.use('/login', loginRouter);
// Register
app.use('/register', registerRouter);
// Hackathon
app.use('/hackathon', hackathonRouter);

//Hackathones Page
// app.get('/hackathon/:filters', filterHackathons);
// app.get('/hackathon/:id', getHackathonInfo);

// Hackathon Page
// app.post('/hackathon/id/enroll', isAuthenticated, enrollHackathon); // Inscribirse a un hackathon
// app.post('/hackathon/id/comments', isAuthenticated, postComment); // Publicar comentario
// app.post('/hackathon/id/comments/id', isAuthenticated, isRightUser, modifyComment); // Modificar comentario

// Create Hackathon Page
app.use('/createhackathon', createHackathonRouter);

//// ********************************

//User -> validate account
app.use('/user', userRouter);

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
        return console.log('ERROR', err);
    }
    console.log(`listening on port ${port}`);

    /*
      let messageListen = (err) ? `Error, $ {err}` : `listening on port ${port}`;
     return console.log(messageListen);
      */
})