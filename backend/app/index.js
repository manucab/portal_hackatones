//Dependencies

require("dotenv").config();


const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const userRouter = require('../routes/user')
const blogRouter = require('../routes/blog')

const app = express();

const port = process.env.PORT || 4444

//Middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/user',userRouter)
app.use('/blog',blogRouter)




app.listen(port ,err => {
    if(err) {
        return console.log('ERROR',err)
    }
    console.log(`listening on port ${port}`)
})