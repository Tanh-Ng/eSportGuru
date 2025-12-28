import React, { useState } from "react";

type Availability = {
    workingDays: number[]
    busyDates: string[]
}

type Props = {
    availability: Availability
    onSelectDate?: (date: Date) => void
}

export default function BookingCalendar({ availability, onSelectDate }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()

    function getStatus(date: Date): "available" | "busy" | "unavailable" {
        const dayOfWeek = date.getDay()
        const iso = date.toISOString().split("T")[0]

        if (availability.busyDates.includes(iso)) return "busy"
        if (availability.workingDays.includes(dayOfWeek)) return "available"
        return "unavailable"
    }

    return (
        <div>
            {/* Header thứ */}
            <div className="grid grid-cols-7 text-center text-sm font-semibold mb-3">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(d => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const date = new Date(year, month, i + 1)
                    const status = getStatus(date)

                    const isSelected =
                        selectedDate?.toDateString() === date.toDateString()

                    return (
                        <button
                            key={i}
                            disabled={status !== "available"}
                            onClick={() => {
                                setSelectedDate(date)
                                onSelectDate?.(date)
                            }}
                            className={`
                                h-12 rounded-lg text-sm font-medium transition
                                
                                ${status === "busy" && "bg-rose-200 text-rose-700 cursor-not-allowed"}
                                ${status === "unavailable" && "bg-slate-100 text-slate-400 cursor-not-allowed"}
                                
                                ${status === "available" && !isSelected &&
                                "bg-white border border-slate-300 hover:bg-emerald-50"}
                                
                                ${isSelected &&
                                "bg-emerald-500 text-white ring-2 ring-emerald-600"}
                            `}
                        >
                            {i + 1}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
