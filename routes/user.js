const {Router} = require("express")
const {userModel, purchaseModel} = require("../DataBase/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {z} = require("zod")
require('dotenv').config()
const userMiddleWare = require("../Middleware/user")

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

const userRouter = Router();

userRouter.post("/signup", async function(req, res){

        try{
            const signUp_Schema = z.object({
                email: z.string().email().min(3).max(40),
                password: z.string().min(5).max(50),
                firstName: z.string().min(3).max(50),
                lastName: z.string().min(3).max(30)
            })
            const { email, password, firstName, lastName } =  req.body;
    
            const correctFormat = signUp_Schema.safeParse(req.body)
            if(!correctFormat.success){
                return res.status(400).json({
                    message: "INCORRECT FORMAT",
                    error: correctFormat.error
                })
            };
    
            const hashedPass = await bcrypt.hash(req.body.password, 8)

            await userModel.create({
                email,
                password: hashedPass,
                firstName,
                lastName
            })
                
        }catch(e){
            console.log("ERROR WHILE CONNECTING TO DB", e)
            if(e.code === 11000){
                return res.status(400).json({
                    message: "EMAIL ALREADY EXIST",
                    e: e.keyValue
                })
            }
        }

        res.json({
            message: "SIGN-UP IS SUCCESSFULL"
        })
})
    
userRouter.post("/signin", async function(req, res){
        
       try{
        const signIn_Schema = z.object({
            email: z.string().email().min(3).max(40),
            password: z.string().min(5).max(50)
        })
        const parsedRes = signIn_Schema.safeParse(req.body) ;
        
            if(!parsedRes.success){
                return res.status(400).json({
                    message: "INCORRECT FORMAT",
                    error: parsedRes.error.errors
                })
            }

            const { email, password } = parsedRes.data

            const user = await userModel.findOne({email: email})

            if(!user){
                return res.status(403).json({
                    message : "WRONG CREDENTIALS"
                })
            }

            const passMatch = await bcrypt.compare(password, user.password)
            
            if(user && passMatch){
                const token = jwt.sign({
                    id: user._id.toString()
                }, JWT_USER_PASSWORD)

                return res.json({
                    message: "YOUR TOKEN IS GENERATED",
                    token: token
                })
            }else{
                return res.status(403).json({
                    message: "INCORRECT CREDENTIALS"
                })
            }
       }catch(e){
            return res.status(500).json({
                message: "INTERNAL SERVER ERROR",
                e: e.message
            })
       }
        
})

    // USERS ALREADY PURCHASED COURSES -U
userRouter.get("/my-purchases",userMiddleWare , async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })
    res.json({
        purchases
    })
})


module.exports = {
    userRouter : userRouter
}