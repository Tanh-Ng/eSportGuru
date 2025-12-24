import { useNavigate } from "react-router-dom";
import RoomStatus from "./RoomStatus";
import React from "react";

export default function RoomRow({ room, index, t }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td className="p-4">{String(index + 1).padStart(2, "0")}</td>

      <td className="p-4">
        <span
          onClick={() => navigate(`/experts/${room.teacherId}`)}
          className="text-indigo-600 hover:underline cursor-pointer"
        >
          {room.teacher}
        </span>
      </td>

      <td className="p-4">{room.subject}</td>
      <td className="p-4">{room.level}</td>

      <td className="p-4">{new Date(room.startTime).toLocaleDateString()}</td>

      <td className="p-4">
        {new Date(room.startTime).toLocaleTimeString()} –{" "}
        {new Date(room.endTime).toLocaleTimeString()}
      </td>

      <td className="p-4">
        <RoomStatus startTime={room.startTime} endTime={room.endTime} t={t} />
      </td>

      <td className="p-4 text-center">
        <button
          disabled={new Date() < new Date(room.startTime)}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
        >
          {t.rooms.start}
        </button>
      </td>
    </tr>
  );
}
