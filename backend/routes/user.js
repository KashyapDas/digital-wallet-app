const express = require("express");
const router = express.Router();
const {userSchema, signinSchema, emailUpdater, passwordUpdater} = require("../zodChecks/userZod")
const {userMiddleware, signinMiddleware} = require("../Middleware/userMiddleware");
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
router.post("/signin",signinMiddleware,(req,res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success)
        {
            res.status(200).json({
                msg:"Invalid Inputs..."
            })  
        } 
    // If exixts that means create a jwt token and pass it as a response and navigate it to the dashboard
    const userId = req.userId;
    const token = jwt.sign({
        userId
    },jwt_secret);


    res.json({
        msg:"Navigate to the dashboard page",
        token
    })
})

// This will allow us to update the password using the email you link with account
router.put("/forgotPassword", async (req,res)=>{

    // Check the schema for the updater 
    const emailSchema = emailUpdater.safeParse(req.headers.email);
    const passwordSchema = passwordUpdater.safeParse(req.headers.password);

    if((!emailSchema.success) || (!passwordSchema.success))
    {
        return res.status(500).json({
            msg:"Invalid Inputs"
        })
    }

    // get the data from the headers if the schema doesn't goes down
    const email = req.headers.email;
    const newPassword = req.headers.password;
    // find the email and update the password if the email get found
    const emailExist = await userModel.findOneAndUpdate({
        email : email
    },{
        password : newPassword
    })
    // if email not found run the following if condition
    if(!emailExist)
    {
        return res.status(500).json({
            msg:"Email not found"
        })
    }
    // Return the response if the if condition was not run. Also show the new password of the user.
    res.json({
        msg:"Password updated...",
        password:`Your new password is ${emailExist.password} `
    })

})

// This is allow the feature of filtering the user based on their username  
router.get("/getAllUsers",async (req,res)=>{
    // search was based on the username
    const filterUsername = req.query.filter || "";

    // Display all those user which contain the letters of filterUSername
    const usernameExist = await userModel.find({
        username : {
            $regex : filterUsername
        }
    })
    // Return all the user that exist with the search query
    res.json({
        msg:"Users Found ",
        list : usernameExist
    })
})

module.exports = router
