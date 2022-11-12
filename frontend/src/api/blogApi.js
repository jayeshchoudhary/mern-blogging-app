import axios from "axios";

export const getAllBlogs = async () => {
    const response = await axios.get("/api/blog/all");

    return response.data;
};

export const getBlog = async (blogId) => {
    const response = await axios.get(`/api/blog/${blogId}`);

    return response.data;
};

export const updateBlog = async (blogData, blogId) => {
    const response = await axios.put(`/api/blog/${blogId}`, blogData);

    return response.data;
};

export const deleteBlog = async (blogId) => {
    const response = await axios.delete(`/api/blog/${blogId}`);

    return response.data;
};

export const createBlog = async (blogData) => {
    const response = await axios.post("/api/blog", blogData);

    return response.data;
};
