const {userModel} = require("../Database/mongoose");

const userMiddleware = async (req,res,next)=>{
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const userExist = await userModel.findOne({
        email: email,
        password: password,
        username : username
    })
    // If user already exist then
    if(userExist)
    {
        return res.status(403).json({
            msg:"Account Already Exist..."
        })
    }
    // otherwise
    next();
}

module.exports = userMiddleware;