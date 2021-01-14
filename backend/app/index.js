// Instances & variables
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const port = process.env.PORT || 4444;

// Routes
const userRouter = require('../routes/user');

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/user',userRouter);


app.listen(port ,err => {
    if(err) {
        return console.log('ERROR',err);
    }
    console.log(`listening on port ${port}`);

    /*
    let messageListen = (err) ? `Error, $ {err}` : `listening on port ${port}`;
    console.log(messageListen);
    */
})
