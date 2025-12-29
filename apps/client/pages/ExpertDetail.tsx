import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { sherpaApi, SherpaDTO } from "../api/sherpa.api";
import { addMockFields } from "../data/mockExpertsExtra";

interface BookingDay {
    date: Date;
    status: "available" | "busy" | "normal";
}

export default function ExpertDetail() {
    const { id } = useParams<{ id: string }>();
    const [expert, setExpert] = useState<SherpaDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const learnerId = user?.id;

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [bookingDays, setBookingDays] = useState<BookingDay[]>([]);
    const [selectedDuration, setSelectedDuration] = useState<number>(60);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Tính toán giá dựa trên thời lượng
    const calculatePrice = (duration: number) => {
        if (!expert) return 0;
        const basePrice = expert.hourlyRate;
        if (duration === 60) return basePrice;
        if (duration === 90) return basePrice * 1.4;
        if (duration === 120) return basePrice * 1.8;
        return basePrice;
    };

    useEffect(() => {
        const fetchExpert = async () => {
            try {
                setLoading(true);
                const allExperts = await sherpaApi.getAllSherpas();
                const expertsWithMock = allExperts.map(addMockFields);

                const found = expertsWithMock.find(e => {
                    const expertId = String(e.id || e._id);
                    return expertId === String(id);
                });

                if (found) {
                    setExpert(found);
                    generateBookingDays();
                } else {
                    console.error("Không tìm thấy expert nào khớp với ID này");
                }
            } catch (err) {
                console.error("Lỗi khi fetch expert:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchExpert();
    }, [id]);

    // Sinh lịch booking 30 ngày demo
    const generateBookingDays = () => {
        const days: BookingDay[] = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const rand = Math.random();
            let status: "available" | "busy" | "normal" = "normal";
            if (rand < 0.3) status = "available";
            else if (rand < 0.5) status = "busy";
            days.push({ date: d, status });
        }
        setBookingDays(days);
    };

    const toggleDate = (day: BookingDay) => {
        if (day.status !== "available") return;
        const exists = selectedDates.find(d => d.toDateString() === day.date.toDateString());
        if (exists) {
            setSelectedDates(selectedDates.filter(d => d.toDateString() !== day.date.toDateString()));
        } else {
            setSelectedDates([...selectedDates, day.date]);
        }
    };

    if (!learnerId)
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-600 dark:text-slate-400">
                Bạn cần đăng nhập để đặt lịch
            </div>
        );

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-600 dark:text-slate-400">
                Loading expert...
            </div>
        );

    if (!expert)
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-600 dark:text-slate-400">
                Expert not found
            </div>
        );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-14 space-y-12">
                {/* HERO SECTION */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 lg:p-10 border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* CỘT 1: MEDIA (AVATAR & GAME INFO) - Chiếm 40% */}
                        <div className="w-full lg:w-[45%] space-y-6">
                            {/* Avatar chính */}
                            <div className="relative group">
                                <img
                                    src={expert.avatar}
                                    alt={expert.name}
                                    className="w-full aspect-[4/3] lg:aspect-square rounded-2xl object-cover shadow-md border-4 border-white dark:border-slate-800"
                                />
                                {expert.isAcceptingBooking && (
                                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-lg flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        ONLINE
                                    </span>
                                )}
                            </div>

                            {/* Row phụ: Ảnh Game & Overview nằm cạnh nhau */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <img
                                    src={expert.game.imageUrl}
                                    alt={expert.game.name}
                                    className="w-full h-full min-h-[180px] rounded-xl object-cover shadow-sm border border-slate-100 dark:border-slate-800"
                                />

                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-widest mb-2">Game Wiki</h3>
                                        <p className="text-[13px] text-slate-600 dark:text-slate-400 line-clamp-4 leading-relaxed">
                                            {expert.game.name} là đỉnh cao Esport toàn cầu, nơi chiến thuật và kỹ năng cá nhân quyết định mọi trận đấu.
                                        </p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Pro Teams</span>
                                            <span className="text-xs font-bold text-indigo-600">500+ Global</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CỘT 2: CONTENT (INFO & ACTIONS) - Chiếm 55% */}
                        <div className="flex-1 flex flex-col justify-between">
                            {/* Thông tin chính */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-yellow-600 font-bold text-sm">
                                            ⭐ {expert.rating}
                                        </div>
                                        <span className="text-slate-300 dark:text-slate-700">|</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30">
                                            Professional Coach
                                        </span>
                                    </div>

                                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                        {expert.name}
                                    </h1>

                                    <div className="flex items-center gap-3 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                        <img src={expert.game.imageUrl} className="w-6 h-6 rounded-full" />
                                        {expert.game.name} specialist
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Experience</p>
                                        <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{expert.experience} Yrs</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Hourly Rate</p>
                                        <p className="text-lg font-bold text-slate-700 dark:text-slate-200">£{expert.hourlyRate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Success Rate</p>
                                        <p className="text-lg font-bold text-emerald-500">98%</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        Biography
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-base">
                                        "{expert.bio}"
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons Box */}
                            <div className="mt-8 p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase mb-1">Ready to improve?</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Book a session or message to discuss your goals.</p>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none whitespace-nowrap">
                                        Message
                                    </button>
                                    <button
                                        onClick={() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" })}
                                        className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 transition-all whitespace-nowrap"
                                    >
                                        Book Session
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* BOOKING PACKAGES */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[60, 90, 120].map(duration => (
                        <div
                            key={duration}
                            onClick={() => setSelectedDuration(duration)}
                            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${selectedDuration === duration
                                ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20"
                                : "border-transparent bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">{duration} Mins Session</span>
                                {selectedDuration === duration && (
                                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white text-[10px]">
                                        ✓
                                    </div>
                                )}
                            </div>
                            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                                £{calculatePrice(duration).toFixed(2)}
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                                <li>• 1-on-1 {expert.game.name} coaching</li>
                                <li>• In-game practice & analysis</li>
                                <li>• Custom improvement plan</li>
                            </ul>
                            <button
                                className={`w-full mt-6 py-2 rounded-lg font-semibold transition ${selectedDuration === duration
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                            >
                                Select Package
                            </button>
                        </div>
                    ))}
                </section>

                {/* CALENDAR */}
                <section id="booking-section">
                    <h3 className="font-semibold mb-2">Monthly Calendar</h3>
                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                        {weekdays.map(day => (
                            <div key={day} className="font-semibold">
                                {day}
                            </div>
                        ))}
                        {bookingDays.map(day => {
                            const isSelected = selectedDates.find(d => d.toDateString() === day.date.toDateString());
                            let bg = "bg-white dark:bg-slate-800";
                            if (day.status === "available")
                                bg = isSelected ? "bg-emerald-500 text-white" : "bg-emerald-100 dark:bg-emerald-800";
                            if (day.status === "busy")
                                bg = "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-400";

                            return (
                                <div
                                    key={day.date.toDateString()}
                                    className={`p-2 rounded-lg cursor-pointer ${bg}`}
                                    onClick={() => toggleDate(day)}
                                >
                                    {day.date.getDate()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Calendar Legend */}
                    <div className="mt-2 text-sm text-slate-500 flex gap-4">
                        <div className="flex items-center gap-1">
                            <span className="w-4 h-4 bg-emerald-100 dark:bg-emerald-800 block rounded-sm"></span> Available
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-4 h-4 bg-red-200 dark:bg-red-800 block rounded-sm"></span> Busy
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-4 h-4 bg-white dark:bg-slate-800 block rounded-sm border"></span> Normal
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
