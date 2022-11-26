import { Button, Paper, Tab, Tabs, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { RenderMarkdown } from "./RenderMarkdown";

export const BlogForm = ({ data = {}, onSubmit, loading }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [markdown, setMarkDown] = useState("");
    const [markDownTab, setMarkDownTab] = useState(0);
    const [formError, setFormError] = useState(false);

    useEffect(() => {
        const { title, description, markdown } = data;

        title && setTitle(title);
        description && setDescription(description);
        markdown && setMarkDown(markdown);
    }, [data]);

    const handleMarkdownTabChange = (_, newValue) => {
        setMarkDownTab(newValue);
    };

    const handleSubmit = () => {
        if (!title || !description || !markdown) {
            setFormError(true);
            return;
        }

        const data = {
            title,
            description,
            markdown,
        };

        setFormError(false);
        onSubmit(data);
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <Paper variant="outlined" style={{ padding: 24 }}>
            <Stack spacing={4}>
                <TextField
                    error={formError && !title}
                    variant="outlined"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    helperText={formError && !title && "Title is required"}
                />

                <TextField
                    error={formError && !description}
                    variant="outlined"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    helperText={
                        formError && !description && "Description is required"
                    }
                />

                <Box>
                    <Tabs
                        style={{
                            marginBottom: 20,
                            borderBottom: "1px solid lightgrey",
                        }}
                        value={markDownTab}
                        onChange={handleMarkdownTabChange}
                    >
                        <Tab label="Edit" />
                        <Tab label="Preview" />
                    </Tabs>

                    <div hidden={markDownTab !== 0}>
                        <TextField
                            error={formError && !markdown}
                            variant="outlined"
                            label="Markdown"
                            value={markdown}
                            multiline
                            rows={20}
                            onChange={(e) => setMarkDown(e.target.value)}
                            fullWidth
                            helperText={
                                formError && !markdown && "Markdown is required"
                            }
                        />
                    </div>

                    <div hidden={markDownTab !== 1}>
                        <Paper style={{ padding: 14 }} variant="outlined">
                            <RenderMarkdown markdown={markdown} />
                        </Paper>
                    </div>
                </Box>

                <Button onClick={handleSubmit} variant="contained">
                    Submit
                </Button>
            </Stack>
        </Paper>
    );
};
