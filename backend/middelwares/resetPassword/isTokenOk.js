const jwt = require('jsonwebtoken')

const isTokenOk= async (req,res,next ) => {

    //Get token

    const {token} = req.params

    //Verify token

    const decodedToken = jwt.verify(token,process.env.JWT_RESET_PASSWORD,function(err, decoded){
        if(err){
            res.status(400).send('Link no longer available')
        } else {
            req.decoded = decoded
            next()
        }
    })
    

}

module.exports = isTokenOk