const {Router} = require("express")
const {userMiddleWare} = require("../Middleware/user")
const { purchaseModel, courseModel } = require("../DataBase/db")

const courseRouter = Router();



// user can buy the enewly available courses
courseRouter.post("/buy-course", userMiddleWare, async function(req, res){
    const userId = req.userId;
    const courseId = req.body.courseId;

    const purchasedCourse = await purchaseModel.create({
        userId:userId,
        courseId:courseId
    })
    res.json({
        message: "YOU HAVE SUCCESSFULLY BROUGHT THE COURSE",
        YourCourse: purchasedCourse
    })
})
    
    // AVAILABLE COURSE TO BUY 
    courseRouter.get("/preview", async function(req, res){
        
        const courses = await courseModel.find({})
        res.json({
            courses
        })
    })
    

    
    module.exports = {
        courseRouter: courseRouter
    }