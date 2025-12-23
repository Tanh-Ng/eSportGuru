import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExpertCard({ expert }) {
    const navigate = useNavigate();
    return (
        <div className="flex gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">

            {/* Avatar */}
            <img
                src={expert.avatar}
                alt={expert.name}
                className="w-24 h-24 rounded-full object-cover"
            />

            {/* Info */}
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {expert.name}
                        <span className="ml-2 text-sm font-medium text-blue-600">
                            £{expert.price}/hr
                        </span>
                    </h3>

                    {expert.qualified && (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            Qualified Expert
                        </span>
                    )}
                </div>

                <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {expert.title} • {expert.experience} years
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">
                    {expert.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-yellow-600">
                        ⭐ {expert.experience}+ years experience
                    </span>

                    <button
                        onClick={() => navigate(`/experts/${expert.id}`)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        View Full Profile →
                    </button>
                </div>
            </div>
        </div>
    );
}
