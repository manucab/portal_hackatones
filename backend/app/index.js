//Dependencies

require("dotenv").config();
const get = require('../controllers/get/showAll')


const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const userRouter = require('../routes/user')

const app = express();

const port = process.env.PORT || 4444

//Middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/user',userRouter)

console.log(port)



app.listen(port ,err => {
    if(err) {
        return console.log('ERROR',err)
    }
    console.log(`listening on port ${port}`)
})