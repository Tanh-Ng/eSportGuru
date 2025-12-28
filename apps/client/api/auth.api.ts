import axios from "axios";

const API_URL = "http://localhost:3001";

export const authApi = {
    async register(data: {
        email: string;
        password: string;
        displayName: string;
    }) {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, data);
            return res.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data; // 👈 trả lỗi chi tiết từ backend
            }
            throw new Error("Không kết nối được server");
        }
    },

    async login(data: {
        email: string;
        password: string;
    }) {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, data);
            return res.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data; // 👈 rất quan trọng
            }
            throw new Error("Không kết nối được server");
        }
    },
};
