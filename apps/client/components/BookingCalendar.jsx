import React, { useState } from "react";

export default function BookingCalendar({ availability }) {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="grid grid-cols-7 gap-3 mt-4">
            {availability.map(day => (
                <button
                    key={day.date}
                    disabled={!day.available}
                    onClick={() => setSelectedDate(day.date)}
                    className={`p-3 rounded-lg text-sm font-medium
            ${day.available
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-600 cursor-not-allowed"
                        }
            ${selectedDate === day.date && "ring-2 ring-green-500"}
          `}
                >
                    {day.date}
                </button>
            ))}
        </div>
    );
}
