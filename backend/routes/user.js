// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

const signUpSchema = zod.object({
    username:zod.string().email(),
    firstname: zod.string().min(3, 'Firstname must be at least 3 characters long'),
    lastname: zod.string().min(3, 'Lastname must be at least 3 characters long'),
    password: zod.string().min(8, 'Password must be at least 8 characters long'),
    cmfpass: zod.string()
}).refine((data) => data.password === data.cmfpass, {
    message: "Passwords don't match",
    path: ["cfmpass"],
});

router.post("/signup", async (req, res) => {
    const { success } = signUpSchema.safeParse(req.body) //we use {success} becoz it wil return an object
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body) //we use {success} becoz it will return an object
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);


    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";


    // Run the filtered query
    const users = await User.find(filter ? {
        $or: [{
            firstname: { "$regex": filter, "$options": "i" }
        }, {
            lastname: { "$regex": filter, "$options": "i" }
        }]
    } : {}); // If no filter, fetch all users);
   

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        // Fetch the logged-in user by using the userId stored in req (from authMiddleware)
        const user = await User.findById(req.userId);

        // If no user is found, return an error
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Return the user details without the password
        res.json({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Server error",
        });
    }
});



module.exports = router;