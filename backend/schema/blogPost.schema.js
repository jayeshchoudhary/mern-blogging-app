const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        markdown: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
        versionKey: false,
    }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
