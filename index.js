const express = require("express");


const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const app = express();

app.use(express.json())

app.use("/api/v7/user", userRouter)
app.use("/api/v7/course", courseRouter)
app.use("/api/v7/admin", adminRouter)



app.listen(4000);