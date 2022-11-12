import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { BlogCreatePage } from "../pages/BlogCreatePage";
import { BlogDetails } from "../pages/BlogDetails";
import { BlogEditPage } from "../pages/BlogEditPage";
import { BlogListPage } from "../pages/BlogListPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const APP_ROUTE = {
    HOME_PAGE: "/",
    BLOG_LIST: "/list",
    BLOG_DETAILS: ":/id/details",
    BLOG_EDIT: ":/id/edit",
    BLOG_CREATE: "/create",
};

export const AppRoute = () => {
    return (
        <Routes>
            <Route
                path={APP_ROUTE.HOME_PAGE}
                element={<Navigate to={APP_ROUTE.BLOG_LIST} />}
            />
            <Route path={APP_ROUTE.BLOG_LIST} element={<BlogListPage />} />
            <Route path={APP_ROUTE.BLOG_DETAILS} element={<BlogDetails />} />
            <Route path={APP_ROUTE.BLOG_EDIT} element={<BlogEditPage />} />
            <Route path={APP_ROUTE.BLOG_CREATE} element={<BlogCreatePage />} />

            {/* Not found page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
