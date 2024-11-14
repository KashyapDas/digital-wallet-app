const jwt_secret = require("../Auth/jwtSecret");
const jwt = require("jsonwebtoken");

const transferMiddleware = (req,res,next)=>{
    const authToken = req.headers.authorization;
    if(!authToken || !authToken.startsWith('Bearer'))
    {
        return res.status(403).json({
            msg:"Token invalid"
        })
    }
    const token = authToken.split(" ")[1];
    try{
        const decoded = jwt.verify(token,jwt_secret);
        req.headers.userid = decoded.userId;
        next();
    }catch(err){
        return res.json({
            msg:"userid not found..."
        })
    }
}


module.exports = transferMiddleware;