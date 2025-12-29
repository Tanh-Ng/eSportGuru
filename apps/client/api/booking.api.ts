import axios from "axios";

const API_URL = "http://localhost:3001"; // sửa theo backend của bạn

export interface CreateBookingPayload {
    learnerId: string
    sherpaId: string
    startTime: string
    notes?: string
}

export const bookingApi = {
    createBooking: async (data: CreateBookingPayload) => {
        const res = await axios.post(`${API_URL}/booking`, data)
        return res.data
    },
}

export const getInviteLink = async (bookingId: string) => {
    const res = await axios.get(`${API_URL}/booking/${bookingId}/invite`);
    return res.data;
};

export const getBookingsForLearner = async (learnerId: string) => {
    const res = await axios.get(`${API_URL}/booking/learner/${learnerId}`)
    return res.data
}

export const getBookingsForSherpa = async (sherpaId: string) => {
    const res = await axios.get(`${API_URL}/booking/sherpa/${sherpaId}`)
    return res.data
}

export const confirmBooking = async (bookingId: string) => {
    const res = await axios.patch(`${API_URL}/booking/${bookingId}/confirm`)
    return res.data
}

export const rejectBooking = async (bookingId: string) => {
    const res = await axios.patch(`${API_URL}/booking/${bookingId}/reject`)
    return res.data
}

