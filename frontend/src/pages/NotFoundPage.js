import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../routes/AppRoute";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleHomePageClick = () => {
        navigate(APP_ROUTE.HOME_PAGE);
    };
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <div>
                <Typography variant="h4" style={{ margin: 20 }}>
                    The page you are looking for does not exist
                </Typography>

                <Button
                    style={{ display: "flex", margin: "auto" }}
                    onClick={handleHomePageClick}
                    variant="outlined"
                >
                    Back to home page
                </Button>
            </div>
        </Box>
    );
};
