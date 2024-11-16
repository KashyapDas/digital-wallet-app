const jwt_secret = require("../Auth/jwtSecret");
const jwt = require("jsonwebtoken");

const transferMiddleware = (req,res,next)=>{
    const authToken = req.headers.authorization;
    try{
        const decoded = jwt.verify(authToken,jwt_secret);
        req.headers.userid = decoded.userId;
        next();
    }catch(err){
        return res.json({
            msg:"userid not found...",
            result: false
        })
    }
}


module.exports = transferMiddleware;