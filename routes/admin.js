const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const adminExist = await Admin.findOne({ username: username });

    if (adminExist) {
        console.log("Admin already exists");
        res.status(400).json({ message: "Admin already exists" });
    } else {
        await Admin.create({
            username: username,
            password: password
        });

        console.log("Admin created successfully");
        res.status(200).json({
            message: "Admin created successfully"
        });
    }
});


router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const title = req.body.title;
        const description = req.body.description;
        const imagelink = req.body.imagelink;
        const price = req.body.price;
        const newcourse = await Course.create({
            title,
            description,
            imagelink,
            price
        })
        console.log("course created succesfully");
        res.json({
            message: "course created succesfully", courseId: newcourse._id
        })
    } catch (error) {
        console.log("error creating the course", error)
        res.status(500).json({
            message: "internal server error"
        })
    }

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;