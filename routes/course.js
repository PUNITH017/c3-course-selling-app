const {Router} = require("express")

const courseRouter = Router();
    courseRouter.post("/buy-course", function(req, res){
        res.json({
            message: "NEW COURSES TO BUY"
        })
    })
    
    // AVAILABLE COURSE TO BUY 
    courseRouter.get("/preview", function(req, res){
        res.json({
            message: "TOTAL COURSE"
        })
    })
    


module.exports = {
    courseRouter: courseRouter
}