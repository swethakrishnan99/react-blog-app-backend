const express = require("express");
const cors = require("cors")

const router = express.Router();
router.use(express.json())
const blogs = [];
router.use(cors())

router.get("/", (req, res) => {
    res.send(blogs);
});


router.post("/", (req, res) => {
    const temp = req.body;
    blogs.length = 0;
    blogs.push(...temp);
    res.json({ success: true, message: "blogs added successfully", blogs });
})
router.get("/:category", (req, res) => {
    const { category } = req.params;
    const categoryBlogs = blogs.filter((blog, index) => blog.category === category.toLocaleLowerCase())
    res.send(categoryBlogs)
})

module.exports = router;
