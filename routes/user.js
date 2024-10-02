const {Router} = require("express")

const userRouter = Router();
    userRouter.post("/signup", function(req, res){
        res.json({
            message: "SIGNUP ENDPOINT"
        })
    })
    
    userRouter.post("/signin", function(req, res){
        res.json({
            message: "SIGNIN ENDPOINT"
        })
    })
    
    // USERS ALREADY PURCHASED COURSES -U
    userRouter.get("/my-purchases", function(req, res){
        res.json({
            message: "USERS PURCHASE LIST"
        })
    })



module.exports = {
    userRouter : userRouter
}