import React, { useState } from "react";

export default function ExpertFilter({ onSearch }) {
    const [subject, setSubject] = useState("");
    const [level, setLevel] = useState("");
    const [budget, setBudget] = useState("");

    return (
        <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                What subject are you looking for help with?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                    className="input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="">Subject</option>
                    <option value="english">English</option>
                    <option value="math">Math</option>
                    <option value="programming">Programming</option>
                </select>

                <select
                    className="input"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <option value="">Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <select
                    className="input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                >
                    <option value="">Budget</option>
                    <option value="any">Any</option>
                    <option value="20-40">£20–£40</option>
                    <option value="40-80">£40–£80</option>
                </select>

                <button
                    onClick={() => onSearch({ subject, level, budget })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 font-medium"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
