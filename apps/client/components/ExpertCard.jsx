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
                            £{expert.hourlyRate}/hr
                        </span>
                    </h3>

                    {expert.isAcceptingBooking && (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            Available
                        </span>
                    )}
                </div>

                <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Game: {expert.game?.name} • {expert.experience} years experience
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">
                    {expert.bio}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-yellow-600">⭐ {expert.rating}</span>

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
