import axios from "axios";

const API = "http://localhost:8080"; // Spring Boot backend

export const uploadAudio = async (file, token) => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${API}/api/audio/upload`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};