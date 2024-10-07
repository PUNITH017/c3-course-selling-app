const {Router} = require("express")
const {userMiddleWare} = require("../Middleware/user")
const courseRouter = Router();



// user can buy th enewly available courses
courseRouter.post("/buy-course", userMiddleWare, async function(req, res){
    const userId = req.userId;
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