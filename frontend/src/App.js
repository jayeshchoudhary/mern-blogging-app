import React from "react";
import { Container } from "@mui/material";
import { NavBar } from "./components/NavBar";
import { AppRouter } from "./routes/AppRoute";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const backendError = error.response.data?.message;
        console.log("error");
        if (backendError) {
            toast.error(backendError);
        }

        return Promise.reject(error);
    }
);

export const App = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Container style={{ marginBlock: 20 }}>
                <AppRouter />
            </Container>
            <ToastContainer position="top-center" autoClose={4000} />
        </React.Fragment>
    );
};
