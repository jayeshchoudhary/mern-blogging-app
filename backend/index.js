const express = require("express");
const { connectDb } = require("./db/connectDb");
const blogPostRoute = require("./routes/blogPost.routes");
const app = express();
const PORT = 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api/blog", blogPostRoute);

app.listen(PORT, () => {
    console.log("Backend is running on port: ", PORT);
});
