const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const app = express();

app.use(express.json())

app.use("/api/v7/user", userRouter)
app.use("/api/v7/course", courseRouter)
app.use("/api/v7/admin", adminRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("MONGODB CONNECTED SUCCESSFULLY"))
    .catch(err=> console.log('MongoDB connection error:', err))

    
app.listen(4000);  