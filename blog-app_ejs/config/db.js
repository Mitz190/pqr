const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://127.0.0.1/blogApp12", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"));
};
