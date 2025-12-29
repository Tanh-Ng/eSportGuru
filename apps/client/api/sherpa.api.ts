import axios from "axios";

const API_URL = "http://localhost:3001";

export type SherpaDTO = {
    _id: string;             // ID của chuyên gia
    userId: string;
    name: string;            // Tên hiển thị (mới)
    avatar: string;         // Link ảnh đại diện (mới)
    bio: string;
    experience: number;      // Số năm kinh nghiệm (mới)
    rating: number;          // Điểm đánh giá (mới)
    hourlyRate: number;
    availability: "AVAILABLE" | "BUSY" | "OFFLINE";
    isAcceptingBooking: boolean;
    createdAt: string;       // Thêm để render "Member since"
    game: {
        _id: string;
        name: string;
        imageUrl: string;
    };
};

export const sherpaApi = {
    getAllSherpas: async (): Promise<SherpaDTO[]> => {
        try {
            const res = await axios.get(`${API_URL}/sherpa/public`);
            return res.data;
        } catch (error) {
            console.error("Error fetching sherpas:", error);
            throw error;
        }
    },
};