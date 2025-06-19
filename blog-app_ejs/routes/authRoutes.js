const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.get("/register", (req, res) => res.render("register"));
router.post("/register", auth.register);
router.get("/login", (req, res) => res.render("login"));
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get(
  "/dashboard",
  (req, res, next) => {
    if (!req.session.userId) return res.redirect("/login");
    next();
  },
  require("../controllers/blogController").dashboard
);

module.exports = router;
