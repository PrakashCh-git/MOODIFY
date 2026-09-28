const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const blacklistingModel = require("../models/blackList.model")
const redis = require("../config/cache")

async function authUser(req,res,next) {

    //Extracting token from the cookies
    const token = req.cookies.token;

    //Checking if the request is carrying token or not
    if(!token) {
        return res.status(401).json({
            message:"Token not found"
        })
    
    }

    //Checking if token is blacklisted
    const isTokenBlackListed = await redis.get(token)
    if(isTokenBlackListed ) {
        return res.status(401).json({
            message:"Token is invalid"
        })
    }



    //If token is there then we need to verify the validity of the token if it is created by the server or not
    try{
        //verifying the token that returns a decoded data in case of success but may throw a error too in case the token is expired
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //***Here we create a new property in request that is req.user. Later to use the decoded data
        req.user = decoded;

        //Giving execution to next function
        next()
    }catch(err) {
        return res.status(401).json({
            message:"Inavalid token"
        })
    }

}

module.exports = {authUser}