import { useParams } from "react-router-dom";
import experts from "../data/experts";
import BookingCalendar from "../components/BookingCalendar";
import ExpertSubjectsTable from "../components/ExpertSubjectsTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { createBooking } from "../api/booking.api";
export default function ExpertDetail() {
    const { id } = useParams();
    const expert = experts.find((e) => String(e.id) === String(id));
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPricing, setSelectedPricing] = useState(null)

    // demo: sau này lấy từ auth context
    const learnerId = "learner_123";

    if (!expert) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-600 dark:text-slate-400">
                Expert not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-14 space-y-12">

                {/* ===== HERO ===== */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8 flex flex-col md:flex-row gap-10">
                    <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-40 h-40 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {expert.name}
                        </h1>

                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                            £{expert.price}/hour
                        </p>

                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            {expert.title} · {expert.experience} years experience
                        </p>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                🎓 Qualified Teacher
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                📄 DBS Checked
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">
                            <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                                Message Tutor
                            </button>
                            <button
                                disabled={!selectedTime || loading}
                                onClick={async () => {
                                    if (!selectedTime) return;

                                    try {
                                        setLoading(true);

                                        const booking = await createBooking({
                                            learnerId, // Đảm bảo ID này có thật trong DB của bạn
                                            sherpaId: id, // id này chính là "694bb3cf06b4a62f2730c3b3"
                                            startTime: selectedTime,
                                            notes: "Booking from Expert Detail page",
                                        });
                                        console.log(booking);

                                        alert("Booking request sent successfully");
                                        console.log("Booking created:", booking);

                                    } catch (err) {
                                        alert("Failed to create booking");
                                        console.error(err);
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? "Booking..." : "Book Session"}
                            </button>

                        </div>
                    </div>
                </section>

                {/* ===== INFO ===== */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            Sherpa’s Summary
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {expert.summary}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            About the Expert
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                            {expert.about}
                        </p>
                    </div>
                </section>

                {/* ===== BOOKING ===== */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Book a Free Introduction
                    </h2>
                    <BookingCalendar
                        availability={expert.availability}
                        duration={selectedPricing && selectedPricing.duration}
                        price={selectedPricing && selectedPricing.price}
                        onSelectDate={(date) => setSelectedTime(date)}
                    />


                </section>

                {/* ===== PRICING ===== */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Session Duration & Pricing
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {expert.pricing.map((item, index) => {
                                    const isSelected =
                                        selectedPricing &&
                                        selectedPricing.duration === item.duration

                                    return (
                                        <tr
                                            key={index}
                                            className={`border-t border-slate-200 dark:border-slate-700 ${isSelected
                                                ? "bg-blue-50 dark:bg-blue-900/20"
                                                : ""
                                                }`}
                                        >
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                                {item.duration} minutes
                                            </td>

                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                                {item.price.toLocaleString()} VND
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedPricing(item)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${isSelected
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white"
                                                        }`}
                                                >
                                                    {isSelected ? "Selected" : "Select"}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {selectedPricing && (
                        <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            You selected a{" "}
                            <span className="font-semibold">
                                {selectedPricing.duration}-minute
                            </span>{" "}
                            session for{" "}
                            <span className="font-semibold">
                                {selectedPricing.price.toLocaleString()} VND
                            </span>
                        </div>
                    )}
                </section>



                {/* ===== SUBJECTS ===== */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        {expert.name} Teaches
                    </h2>
                    <ExpertSubjectsTable subjects={expert.subjects} />
                </section>

            </main>

            <Footer />
        </div>
    );
}
