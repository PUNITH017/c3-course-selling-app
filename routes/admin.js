const {Router} = require("express");
const {adminModel} = require("../DataBase/db")

const adminRouter = Router();

adminRouter.post("/signup", function(req, res){
    res.json({
        message: "SIGNUP ENDPOINT"
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "SIGNIN ENDPOINT"
    })
})

// ADMIN CAN CREATE THE COURSE 
adminRouter.post("/", function(req, res){
    res.json({
        message: "admin will create the courses"
    })
})

// ADMIN CAN EDIT COURSE ....
adminRouter.put("/", function(req, res){
    res.json({
        message: "edit the course"
    })
})

// ADMIN GET ALL OF THE COURSE THAT HE CREATED 
adminRouter.get("/bulk", function(req, res){
    res.json({
        message: "admin will get all of his course"
    })
})


module.exports = {
    adminRouter: adminRouter
}