const {Router} = require("express");
const {adminModel, courseModel} = require("../DataBase/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {z} = require("zod");
const { adminMiddleWare } = require("../Middleware/admin");
require('dotenv').config()

const JWT_ADMIN_PASS = process.env.JWT_ADMIN_PASS;
const adminRouter = Router();

adminRouter.post("/signup", async function(req, res){
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

        await adminModel.create({
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

adminRouter.post("/signin", async function(req, res){
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

            const admin = await adminModel.findOne({email: email})

            if(!admin){
                return res.status(403).json({
                    message : "WRONG CREDENTIALS"
                })
            }

            const passMatch = await bcrypt.compare(password, admin.password)
            
            if(admin && passMatch){
                const token = jwt.sign({
                    id: admin._id.toString()
                }, JWT_ADMIN_PASS)

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

// ADMIN CAN CREATE THE COURSE 
// ADMIN CAN CREATE THE COURSE 
adminRouter.post("/course", adminMiddleWare, async function(req, res) {
    const adminId = req.adminId;

    const { title, description, price, imageURL } = req.body;

    try {
        // Create a new course and associate it with the admin
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageURL: imageURL,
            creatorId: adminId // Associate the course with the admin ID
        });

        res.json({
            message: "COURSE CREATED SUCCESSFULLY",
            courseId: course._id,  // Return the created course ID
            adminId : adminId
        });
    } catch (e) {
        console.error("Error creating course:", e);
        res.status(500).json({
            message: "ERROR WHILE CREATING THE COURSE",
            error: e.message
        });
    }
});


// ADMIN CAN EDIT COURSE ....
adminRouter.put("/course", adminMiddleWare,  async function(req, res){
    const adminId = req.adminId;

    const { title, description, price, imageURL, courseId } = req.body

    if(!courseId){
        return res.status(400).json({
            message: "COURSE ID IS REQUIRED"
        })
    }

    try{
        const course = await courseModel.updateOne(
            {_id: courseId, creatorId: adminId},
        {
            title,
            description,
            price,
            imageURL,
            creatorId:adminId
        })

        res.json({
            message: "COURSE UPDATED SUCCESSFULLY",
            updatedCourse: course
        })

        console.log('Admin ID:', adminId);
        console.log('Course ID:', courseId);
        console.log('Request Body:', req.body);


    }catch(e){
        res.status(500).json({
            message: "ERROR WHILE UPDAYING THE COURSE",
            error: e.message
        })
    }
})

// ADMIN GET ALL OF THE COURSE THAT HE CREATED 
adminRouter.get("/course/bulk", adminMiddleWare,  async function(req, res){
    const adminId = req.adminId;

    try {
        const courses = await courseModel.find({
            creatorId: adminId
        })

        if(!courses || courses.length === 0){
            return res.status(404).json({
                message:"NO COURSES FOUND FOR THIS USER"
            })
        }
    
        res.json({
            message: "THESE ARE THE TOTAL COURSES",
            course: courses
        })
    } catch (e) {
        res.status(500).json({
            message: "ERROR WHILE FETCHING THE COURSES",
            error: e.message
        })
    }
})


module.exports = {
    adminRouter: adminRouter
}