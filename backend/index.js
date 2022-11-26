require("dotenv").config();
const path = require("path");
const express = require("express");
const { connectDb } = require("./db/connectDb");
const blogPostRoute = require("./routes/blogPost.routes");
const app = express();
const PORT = 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api/blog", blogPostRoute);

// Set static folder up in production
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

app.listen(PORT, () => {
    console.log("Backend is running on port: ", PORT);
});
