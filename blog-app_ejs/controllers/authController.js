const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
  res.redirect("/login");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.send("Invalid credentials");
  }
  req.session.userId = user._id;
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};
