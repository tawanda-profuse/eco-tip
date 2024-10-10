if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Importing modules
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const tipRoutes = require("./routes/tipRoutes");
const cors = require("cors");
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose Connected"))
  .catch((error) => console.log(error));

// Middleware and static files
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use("/", tipRoutes);
app.use((req, res) => {
  res.json({ title: "404" });
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/");
});

// Conditionally listen on a port only if NODE_ENV=development
if (process.env.NODE_ENV !== "production") {
  var port = process.env.port || 5000;

  app.listen(port, function () {
    console.log(`Express server listening on port ${port}`);
  });
}

// Export the app for serverless function in production (Vercel)
module.exports = app;
