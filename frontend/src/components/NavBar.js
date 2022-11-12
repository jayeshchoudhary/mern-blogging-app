import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../routes/AppRoute";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Button
                        style={{ color: "white", textTransform: "none" }}
                        startIcon={<BookIcon />}
                        onClick={() => navigate(APP_ROUTE.BLOG_LIST)}
                    >
                        <Typography variant="h6">Blogging App</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
