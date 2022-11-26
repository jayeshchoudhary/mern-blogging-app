import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getBlog, updateBlog } from "../api/blogApi";
import { BlogForm } from "../components/BlogForm";
import { APP_ROUTE } from "../routes/AppRoute";

export const BlogEditPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [blogDetails, setBlogDetails] = useState({});
    const navigate = useNavigate();

    const fetchBlogDetails = async () => {
        setLoading(true);
        try {
            const blogDetails = await getBlog(id);

            setBlogDetails(blogDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const handleBlogEditConfirm = async (data) => {
        setLoading(true);
        try {
            await updateBlog(data, id);

            toast.success("Blog updated successfully");

            const url = APP_ROUTE.BLOG_DETAILS.replace(":id", id);

            navigate(url);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <BlogForm
            loading={loading}
            onSubmit={handleBlogEditConfirm}
            data={blogDetails}
        />
    );
};
