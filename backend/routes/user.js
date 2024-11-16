const express = require("express");
const router = express.Router();
const {userSchema, signinSchema, emailUpdater, passwordUpdater} = require("../zodChecks/userZod")
const {userMiddleware, signinMiddleware} = require("../Middleware/userMiddleware");
const {userModel, accountModel} = require("../Database/mongoose");
const jwt_secret = require("../Auth/jwtSecret");
const jwt = require("jsonwebtoken");


// This is the signup route where all the signup logic will handle 
router.post("/signup",userMiddleware, async (req,res)=>{
    const {success} = userSchema.safeParse(req.body);
    if(!success)
    {
        return res.status(403).json({
            msg:"Invalid Input",
            result:false
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
    console.log(newUser)
    // create a jwt token for the user
    const userId = newUser._id; 

    await accountModel.create({
        userId,
        balance: 1+Math.random()*1000
    })

    const token = jwt.sign({
        userId
    },jwt_secret);

    // pass the token in the response set
    res.json({
        msg:"Account created successfully...",
        token,
        result:true
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
        token,
        result:true
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
    // get the token and fetched the userid if both the id same then avoid the user to find
    const authToken = req.headers.authorization;
    const verifiedToken = jwt.verify(authToken,jwt_secret);
    // search was based on the username
    const filterUsername = req.query.filter;

    // Display all those user which contain the letters of filterUSername but don't call if the string is empty
    if(filterUsername<=0)
    {   
        return res.json({
            msg:"User Not Found",
            list:""
        })
    }
    // Here the user who login were not suppose to display on the user list as transfer can't occur between yourself
    const usernameExist = await userModel.find({
        $and: [
            {
                username: {
                    $regex: filterUsername,
                }
            },
            {
                _id: { 
                    $ne: verifiedToken.userId  // Assuming currentUserId is the ID you want to exclude
                }
            }
        ]
    }).select('username firstname lastname _id');
    // Return all the user that exist with the search query
    console.log(usernameExist);
    res.json({
        msg:"Users Found ",
        list : usernameExist
    })
})

router.post("/authRoute",async (req,res)=>{
    try{
        const authToken = req.headers.authorization;
        const checkAuth = jwt.verify(authToken,jwt_secret);
        // Check weather this userId is present or not
        const isExits = await userModel.findOne({
            _id : checkAuth.userId
        });
        if(!isExits)
        {
            return res.json({
                msg:"User not exist",
                prevent: true
            })
        }
        res.json({
            msg:"User exists",
            prevent: false
        })
    }catch(err){
        res.json({
            msg:"User not exist",
            prevent: true
        })
    }
    
})

module.exports = router
