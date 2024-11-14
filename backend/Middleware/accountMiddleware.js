const jwt_secret = require("../Auth/jwtSecret");
const jwt = require("jsonwebtoken");
const { accountModel } = require("../Database/mongoose");

const accountMiddleware =async (req,res,next) =>{
    try{
        const authToken = req.headers.authorization;
        const decoded = jwt.verify(authToken,jwt_secret);
        const userId = decoded.userId;
        console.log("Decoded token:", decoded);

        const isExist = await accountModel.findOne({
            userId : decoded.userId
        })
        if(!isExist)
        {
            return res.json({
                msg:"User not found"
            })
        }
        req.headers.userId = decoded.userId
        next();
        
    }catch(err){
        return res.json({
            msg:"Invalid Token..."
        })
    }



}


module.exports= accountMiddleware;