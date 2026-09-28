const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistingModel = require("../models/blackList.model");
const redis = require("../config/cache")

async function registerController(req,res) {
    const{ username,email,password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExist) {
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hasedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hasedPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },process.env.JWT_SECRET,
    {
        expiresIn:"3d"
    }
    )

    res.cookie("token",token);

    return res.status(201).json({
        message:"User has been registerd successfully",
        user: {
            id: user._id,
            username:user.username,
            email:user.email
        }
    })

}

async function loginController(req,res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne(
        {
            $or : [
                {username},
                {email}
            ]
        }
    ).select("+password")

    if(!user) {
        return res.status(400).json({
            message:"Inavalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token);

    return res.status(200).json({
        message:"User logged in successfully",
        user : {
            id:user._id,
            username:user.email,
            email:user.email
        },
        token:token
    })
}

async function getMe(req,res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message:"User data fetched successfully",
        user
    })
}

async function logoutUser(req,res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token,Date.now().toString());

    res.status(201).json({
        message:"Logout successfully"
    })
}


module.exports = {registerController,loginController,getMe,logoutUser}