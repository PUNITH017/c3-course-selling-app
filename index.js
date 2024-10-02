const express = require("express");

const app = express();

app.use(express.json())

app.post("/user/signup", function(req, res){
    res.json({
        message: "SIGNUP ENDPOINT"
    })
})

app.post("/user/signin", function(req, res){
    res.json({
        message: "SIGNIN ENDPOINT"
    })
})


app.post("/user/buy-course", function(req, res){
    res.json({
        message: "NEW COURSES TO BUY"
    })
})

// USERS ALREADY PURCHASED COURSES
app.get("/user/my-purchases", function(req, res){
    res.json({
        message: "USERS PURCHASE LIST"
    })
})

// AVAILABLE COURSE TO BUY
app.get("/courses", function(req, res){
    res.json({
        message: "SIGNUP ENDPOINT"
    })
})

app.listen(4000);