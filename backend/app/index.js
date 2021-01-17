// Instances & variables
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const port = process.env.PORT || 4444;
const app = express();

// Routes
const adminRouter = require('../routes/admin/admin');
const loginRouter = require('../routes/login');


// const userRouter = require('../routes/user');


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Endpoints
// Admin
app.use('/admin', adminRouter);
// Landingpage
app.use('/login', loginRouter);



// app.post('/validate', validateAccount);
// app.post('/register', register);

// //Hackathones Page
// app.get('/hackathon/:filters', filterHackathons);
// app.get('/hackathon/:id', getHackathonInfo);

// //Hackathon Page
// app.post('/hackathon/id/enroll', isAuthenticated, enrollHackathon);
// app.post('/hackathon/id/comments', isAuthenticated, postComment);
// app.post('/hackathon/id/comments/id', isAuthenticated, isRightUser, modifyComment);


// //Create Hackathon Page
// app.post('/createhackathon', isAuthenticated, isOrganizer, createHackathon);


//// ********************************



// app.use('/user', userRouter);

// // Test connection db
// const db = require('../db/connection');

// console.log(db.getConnection());

// const dbtest = async(req, res) => {

//     result = await db.getConnection()

//     console.log(result.connection.authorized);

// }

// dbtest();


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