const Blog = require("../models/Blog");


exports.dashboard = async (req, res) => {
  const blogs = await Blog.find().populate("author");
  res.render("dashboard", {
    blogs,
    userId: req.session.userId,
  });
};

exports.viewCreateForm = (req, res) => {
  res.render("blog/create");
};

exports.createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  await Blog.create({ title, content, imageUrl, author: req.session.userId });
  res.redirect("/dashboard");
};

exports.editForm = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (String(blog.author) !== req.session.userId)
    return res.send("Unauthorized");
  res.render("blog/edit", { blog });
};

exports.updateBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (String(blog.author) !== req.session.userId)
    return res.send("Unauthorized");
  await Blog.findByIdAndUpdate(req.params.id, { title, content, imageUrl });
  res.redirect("/dashboard");
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (String(blog.author) !== req.session.userId)
    return res.send("Unauthorized");
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
};
