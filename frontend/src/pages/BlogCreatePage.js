import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlog } from "../api/blogApi";
import { BlogForm } from "../components/BlogForm";
import { APP_ROUTE } from "../routes/AppRoute";

export const BlogCreatePage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBlogCreateConfirm = async (data) => {
        setLoading(true);
        try {
            const createdBlog = await createBlog(data);

            toast.success("Blog created successfully");

            const url = APP_ROUTE.BLOG_DETAILS.replace(":id", createdBlog._id);

            navigate(url);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return <BlogForm loading={loading} onSubmit={handleBlogCreateConfirm} />;
};
