const express = require("express");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
const blogs = [];
router.use(cors());

router.post("/", (req, res) => {
    const temp = req.body;
    blogs.length = 0;
    blogs.push(...temp);
    res.json({ success: true, message: "blogs added successfully", blogs });
});

router.get("/", (req, res) => {
    res.send(blogs);
});
router.get("/most-viewed", (req, res) => {
    const mostViewed = blogs
        .sort((a, b) => (a.views > b.views ? -1 : b.views > a.views ? 1 : 0))
        .filter((blog, index) => index < 5);
    res.send(mostViewed);
});
router.get("/featured", (req, res) => {
    const featured = blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0))
    res.send(featured);
});
router.get("/latest", (req, res) => {
    const latest = blogs
        .sort((a, b) => (a.createdOn > b.createdOn ? -1 : b.createdOn > a.createdOn ? 1 : 0))
    res.send(latest);
});

router.get("/:category", (req, res) => {
    const { category } = req.params;
    const categoryBlogs = isNaN(category)
        ? blogs.filter(
            (blog, index) => blog.category === category.toLocaleLowerCase()
        )
        : blogs.filter((blog, index) => blog.id == category);
    res.send(categoryBlogs);
});
router.post("/:category", (req, res) => {
    const { category } = req.params;
    const temp = req.body;
    const blog = blogs.filter((blog, index) => { blog.id == category })
    blog.push({ ...temp })
    console.log(blog)
    res.json({ success: true, message: "blog liked successfully", blog });
})
router.get("/:category/most-viewed", (req, res) => {
    const { category } = req.params;
    const categoryBlogs = blogs.filter(
        (blog, index) => blog.category === category.toLocaleLowerCase()
    );
    const mostViewed = categoryBlogs
        .sort((a, b) => (a.views > b.views ? -1 : b.views > a.views ? 1 : 0))
        .filter((blog, index) => index < 4);
    res.send(mostViewed);
});
router.get("/:category/latest", (req, res) => {
    const { category } = req.params;
    const categoryBlogs = blogs.filter(
        (blog, index) => blog.category === category.toLocaleLowerCase()
    );
    categoryBlogs.sort((a, b) => (a.createdOn > b.createdOn ? -1 : b.createdOn > a.createdOn ? 1 : 0))
    res.send(categoryBlogs);
});

module.exports = router;
