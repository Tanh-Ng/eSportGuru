import React from "react";

export default function ExpertSubjectsTable({ subjects }) {
    return (
        <table className="w-full border border-slate-200 dark:border-slate-700 mt-4 text-slate-900 dark:text-slate-100">
            <thead className="bg-slate-200 dark:bg-slate-800">
                <tr>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Level</th>
                    <th className="p-3 text-left">Rate</th>
                </tr>
            </thead>

            <tbody>
                {subjects.map((s, i) => (
                    <tr
                        key={i}
                        className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                    >
                        <td className="p-3">{s.subject}</td>
                        <td className="p-3">{s.level}</td>
                        <td className="p-3">{s.rate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
