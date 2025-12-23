import { useParams } from "react-router-dom";
import experts from "../data/experts";
import BookingCalendar from "../components/BookingCalendar";
import ExpertSubjectsTable from "../components/ExpertSubjectsTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
export default function ExpertDetail() {
    const { id } = useParams();
    const expert = experts.find((e) => e.id === Number(id));

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
                            <button className="px-6 py-2 rounded-lg border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition">
                                Book Session
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
                    <BookingCalendar availability={expert.availability} />
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
