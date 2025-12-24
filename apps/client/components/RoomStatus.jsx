import CountDown from "./CountDown";
import React from "react";

export default function RoomStatus({ startTime, endTime, t }) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    return (
      <span className="text-yellow-600 font-medium">
        ⏳ {t.rooms.upcoming} (
        <CountDown targetTime={startTime} />)
      </span>
    );
  }

  if (now >= start && now <= end) {
    return <span className="text-red-600 font-medium">🔴 {t.rooms.busy}</span>;
  }

  return <span className="text-green-600 font-medium">🟢 {t.rooms.free}</span>;
  if (!startTime || !endTime) {
    return <span className="text-slate-400">--</span>;
  }
}
