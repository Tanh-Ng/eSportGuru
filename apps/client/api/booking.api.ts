import axios from "axios";

const API_URL = "http://localhost:3001"; // sửa theo backend của bạn

export const createBooking = async (data: {
    learnerId: string;
    sherpaId: string;
    startTime: string;
    notes?: string;
}) => {
    const res = await axios.post(`${API_URL}/booking`, data);
    return res.data;
};

export const getInviteLink = async (bookingId: string) => {
    const res = await axios.get(`${API_URL}/booking/${bookingId}/invite`);
    return res.data;
};
