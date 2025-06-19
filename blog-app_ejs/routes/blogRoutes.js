const express = require("express");
const router = express.Router();
const blog = require("../controllers/blogController");

const protect = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

router.get("/create", protect, blog.viewCreateForm);
router.post("/create", protect, blog.createBlog);
router.get("/edit/:id", protect, blog.editForm);
router.post("/edit/:id", protect, blog.updateBlog);
router.get("/delete/:id", protect, blog.deleteBlog);

module.exports = router;
