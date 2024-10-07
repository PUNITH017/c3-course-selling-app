const jwt = require("jsonwebtoken");
require("dotenv").config()

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

function userMiddleWare(req, res, next){

    const authHeader = req.Headers['authorization'];
    const token = authHeader;

    if(!token){
        return res.status(401).json({
            message:"JWT MUST BE PROVIDED"
        })
    }
    try {
        const decode = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decode.id;
        next();
    } catch (e) {
        return res.status(403).json({
            message:"INVALID TOKEN "
        })
    }
}

module.exports = {
    userMiddleWare: userMiddleWare
}