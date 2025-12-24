import Header from "../components/Header";
import Footer from "../components/Footer";
import experts from "../data/experts";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function RoomList() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const rooms = experts.flatMap((expert) =>
    expert.subjects.map((subject) => {
      const isBusy = !expert.availability.some((slot) => slot.available);

      return {
        roomId: `${expert.id}-${subject.subject}-${subject.level}`,
        teacher: expert.name,
        teacherId: expert.id,
        subject: subject.subject,
        level: subject.level,
        isBusy,
      };
    }),
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">
          {t.rooms.title}
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="p-4 text-left">{t.rooms.room}</th>
              <th className="p-4 text-left">{t.rooms.teacher}</th>
              <th className="p-4 text-left">{t.rooms.subject}</th>
              <th className="p-4 text-left">{t.rooms.level}</th>
              <th className="p-4 text-left">{t.rooms.status}</th>
              <th className="p-4 text-center">{t.rooms.action}</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.roomId}>
                <td className="p-4">{String(index + 1).padStart(2, "0")}</td>

                {/* Teacher – useNavigate */}
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

                <td className="p-4">
                  {room.isBusy ? (
                    <span className="text-red-600 font-medium">
                      🔴 {t.rooms.busy}
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      🟢 {t.rooms.free}
                    </span>
                  )}
                </td>

                <td className="p-4 text-center">
                  <button
                    disabled={room.isBusy}
                    className={`px-4 py-2 rounded-lg font-medium transition
                      ${
                        room.isBusy
                          ? "bg-slate-400 cursor-not-allowed opacity-60"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }
                    `}
                  >
                    {t.rooms.start}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
}
