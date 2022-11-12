import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const LoadingIndicator = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <CircularProgress />
        </Box>
    );
};
