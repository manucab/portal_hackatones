// Instances & variables
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const port = process.env.PORT || 4444;
const app = express();

// Routes
const homeRouter = require('../routes/home');
const adminRouter = require('../routes/admin/admin');
const loginRouter = require('../routes/login');
const createHackathonRouter = require('../routes/createHackathon');
const userRouter = require('../routes/user');
const registerRouter = require('../routes/register');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Endpoints
// Home
app.use('/', homeRouter);
// Admin
app.use('/admin', adminRouter);
// Login
app.use('/login', loginRouter);
// Register
app.use('/register',registerRouter);

// app.post('/register', register);

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

//  Test connection db
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
