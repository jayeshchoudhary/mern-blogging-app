import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const RenderReadTime = ({ markdown = "" }) => {
    const AVG_READ_WPM = 150;
    const [readTime, setReadTime] = useState("N/A");

    useEffect(() => {
        if (!markdown) {
            return;
        }
        const wordsLength = markdown.split(" ").length;
        const readTime = Math.ceil(wordsLength / AVG_READ_WPM);

        setReadTime(readTime);
    }, []);

    return (
        <Typography color="gray" variant="subtitle1">
            {`${readTime} min read`}
        </Typography>
    );
};
