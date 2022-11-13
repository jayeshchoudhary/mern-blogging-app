const express = require("express");
const BlogPost = require("../schema/blogPost.schema");
const { validateCreateBlogPost } = require("../validation/blogPost.validation");
const router = express.Router();

// create new blog post
router.post("/", async (req, res) => {
    try {
        const newBlogPost = req.body;

        const errorMessage = validateCreateBlogPost(newBlogPost);

        if (errorMessage) {
            throw new Error(errorMessage);
        }

        const savedBlogPost = await new BlogPost(newBlogPost).save();

        res.status(200).send(savedBlogPost);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// get all blog post
router.get("/all", async (req, res) => {
    try {
        const allBlogPost = await BlogPost.find();

        res.status(200).json(allBlogPost);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// get a single blog post
router.get("/:id", async (req, res) => {
    try {
        const blogPostId = req.params.id;

        const blogPost = await BlogPost.findOne({ _id: blogPostId });

        if (!blogPost) {
            throw new Error("Blog post with given id not found");
        }

        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// delete a single blog post
router.delete("/:id", async (req, res) => {
    try {
        const blogPostId = req.params.id;
        const deletedBlogPost = await BlogPost.findOneAndDelete({
            _id: blogPostId,
        });

        if (!deletedBlogPost) {
            throw new Error("Blog post with given id not found");
        }

        res.status(200).json(deletedBlogPost);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// edit single blog post
router.put("/:id", async (req, res) => {
    try {
        const blogPostId = req.params.id;
        const blogPostData = req.body;

        const errorMessage = validateCreateBlogPost(blogPostData);

        if (errorMessage) {
            throw new Error(errorMessage);
        }

        const editedBlogPost = await BlogPost.findOneAndUpdate(
            { _id: blogPostId },
            blogPostData,
            { new: true }
        );

        if (!editedBlogPost) {
            throw new Error("Blog post with given id not found");
        }

        res.status(200).json(editedBlogPost);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

module.exports = router;
