import axios from "axios";

const API_URL = "http://localhost:3001";

export type SherpaDTO = {
    _id: string;
    userId: string;
    bio: string;
    hourlyRate: number;
    availability: "AVAILABLE" | "BUSY" | "OFFLINE";
    isAcceptingBooking: boolean;
    game: {
        _id: string;
        name: string;
        imageUrl: string;
    };
};

export const sherpaApi = {
    getAllSherpas: async (): Promise<SherpaDTO[]> => {
        const res = await axios.get(`${API_URL}/sherpa/public`);
        return res.data;
    },
};
