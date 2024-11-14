const express = require("express");
const router = express.Router();
const userSchema = require("../zodChecks/userZod")
const userMiddleware = require("../Middleware/userMiddleware");
const {userModel} = require("../Database/mongoose");
const jwt_secret = require("../Auth/jwtSecret");
const jwt = require("jsonwebtoken");

// This is the signup route where all the signup logic will handle 
router.post("/signup",userMiddleware, async (req,res)=>{
    const {success} = userSchema.safeParse(req.body);
    if(!success)
    {
        return res.status(403).json({
            msg:"Invalid Input"
            // msg:success
        })
    }
    // If the validation not goes wrong then check weather the user already exist or not.
    // If not exist allow the user create one
    const newUser = await userModel.create({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password,
    })
    // create a jwt token for the user
    const userId = newUser._id; 
    const token = jwt.sign({
        userId
    },jwt_secret);
    // pass the token in the response set
    res.json({
        msg:"Account created successfully...",
        token
    })
})

// This is the signin route where all the signin logic will handle
router.post("/signin",(req,res)=>{
    
})

// This is the user Dashboard which can diplay the user balance and allow to search a specfic user 
router.get("/dashboard",(req,res)=>{
    
})

// This is allow the feature of filtering the user based on their username  
router.get("/getAllUsers",(req,res)=>{
    
})

module.exports = router