import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBlog, getBlog } from "../api/blogApi";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { RenderMarkdown } from "../components/RenderMarkdown";
import { RenderReadTime } from "../components/RenderReadTime";
import { APP_ROUTE } from "../routes/AppRoute";

export const BlogDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [blogDetails, setBlogDetails] = useState({});
    const navigate = useNavigate();
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const fetchBlogDetails = async () => {
        setLoading(true);
        try {
            const blogDetails = await getBlog(id);

            blogDetails.createdAt = new Date(
                blogDetails.createdAt
            ).toDateString();
            blogDetails.updatedAt = new Date(
                blogDetails.updatedAt
            ).toDateString();

            if (blogDetails.createdAt === blogDetails.updatedAt) {
                delete blogDetails.updatedAt;
            }

            setBlogDetails(blogDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const handleDelete = () => {
        setDeleteDialogVisible(true);
    };

    const handleEdit = () => {
        const url = APP_ROUTE.BLOG_EDIT.replace(":id", blogDetails._id);
        navigate(url);
    };

    const handleDeleteConfirm = async () => {
        setLoading(true);
        try {
            await deleteBlog(id);
            navigate(APP_ROUTE.BLOG_LIST);

            toast.success("Blog deleted successfully.");
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    if (Object.keys(blogDetails).length === 0) {
        return <Typography>No Data</Typography>;
    }

    return (
        <>
            <Card variant="outlined">
                <CardHeader
                    title={blogDetails.title}
                    titleTypographyProps={{ variant: "h4" }}
                    action={
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Stack>
                    }
                    subheader={
                        <Box mt="15px">
                            <Typography color={"gray"} variant="subtitle1">
                                Created at - {blogDetails.createdAt}
                            </Typography>
                            {blogDetails.updatedAt && (
                                <Typography color={"gray"} variant="subtitle1">
                                    Updated at - {blogDetails.updatedAt}
                                </Typography>
                            )}
                            <RenderReadTime markdown={blogDetails.markdown} />
                        </Box>
                    }
                />
                <CardContent>
                    <Typography>
                        <strong>Description</strong>
                    </Typography>
                    <Typography>{blogDetails.description}</Typography>

                    <Divider style={{ marginBlock: 20 }} />

                    <Box>
                        <RenderMarkdown markdown={blogDetails.markdown} />
                    </Box>
                </CardContent>
            </Card>
            <Dialog
                open={deleteDialogVisible}
                onClose={() => setDeleteDialogVisible(false)}
            >
                <DialogTitle>Delete Blog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting blog will remove it permanently. Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogVisible(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
