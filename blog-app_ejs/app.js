const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// DB Config
require("./config/db")();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: "secretblogsession",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/", authRoutes);
app.use("/blogs", blogRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
