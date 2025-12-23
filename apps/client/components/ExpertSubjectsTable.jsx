import React from "react";
export default function ExpertSubjectsTable({ subjects }) {
    return (
        <table className="w-full border mt-4">
            <thead className="bg-slate-100">
                <tr>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Level</th>
                    <th className="p-3 text-left">Rate</th>
                </tr>
            </thead>
            <tbody>
                {subjects.map((s, i) => (
                    <tr key={i} className="border-t">
                        <td className="p-3">{s.subject}</td>
                        <td className="p-3">{s.level}</td>
                        <td className="p-3">{s.rate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
