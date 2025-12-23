import React from "react";

export default function ExpertFilter() {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                What subject are you looking for help with?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="input">
                    <option>Subject</option>
                    <option>English</option>
                    <option>Math</option>
                    <option>Programming</option>
                </select>

                <select className="input">
                    <option>Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>

                <select className="input">
                    <option>Budget</option>
                    <option>Any</option>
                    <option>£20–£40</option>
                    <option>£40–£80</option>
                </select>
            </div>
        </div>
    );
}
