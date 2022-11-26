import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogApi";
import { LoadingIndicator } from "../components/LoadingIndicator";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../routes/AppRoute";
import AddIcon from "@mui/icons-material/Add";
import { RenderReadTime } from "../components/RenderReadTime";

export const BlogListPage = () => {
    const [loading, setLoading] = useState(true);
    const [allBlogs, setAllBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchAllBlogs = async () => {
        setLoading(true);
        try {
            const allBlogs = await getAllBlogs();
            allBlogs.map((blog) => {
                blog.createdAt = new Date(blog.createdAt).toDateString();
                return blog;
            });

            setAllBlogs(allBlogs);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const handleReadMoreClick = (blogId) => {
        const url = APP_ROUTE.BLOG_DETAILS.replace(":id", blogId);

        navigate(url);
    };

    const handleCreateBlog = () => {
        navigate(APP_ROUTE.BLOG_CREATE);
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <Grid container spacing={3}>
            <Grid display="flex" item xs={12} justifyContent="space-between">
                <Typography variant="h4">List of blogs</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateBlog}
                >
                    Create new blog
                </Button>
            </Grid>

            {(!allBlogs || allBlogs.length === 0) && (
                <Box
                    height={300}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4">No Blogs Available</Typography>
                </Box>
            )}

            {!(!allBlogs || allBlogs.length === 0) &&
                allBlogs.map((blog, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card variant="outlined">
                            <CardHeader
                                title={blog.title}
                                subheader={blog.createdAt}
                            />

                            <CardContent>{blog.description}</CardContent>

                            <CardActions
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: 16,
                                }}
                            >
                                <RenderReadTime markdown={blog.markdown} />

                                <Button
                                    variant="outlined"
                                    endIcon={<ChevronRightIcon />}
                                    onClick={() =>
                                        handleReadMoreClick(blog._id)
                                    }
                                >
                                    Read More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};
