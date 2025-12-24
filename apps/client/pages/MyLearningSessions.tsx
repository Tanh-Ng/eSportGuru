import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */
type LearningSession = {
  id: number;
  teacher: string;
  subject: string;
  level: string;
  startTime: string;
  endTime: string;
  discordLink: string;
};

type SessionStatus = "upcoming" | "learning" | "finished";

/* ================= COMPONENT ================= */
export default function MyLearningSessions() {
  const { t } = useLanguage();

  const [sessions] = useState<LearningSession[]>([
    {
      id: 1,
      teacher: "Nguyen Van A",
      subject: "Math",
      level: "Beginner",
      startTime: "2025-12-25T14:00:00",
      endTime: "2025-12-25T15:00:00",
      discordLink: "https://discord.gg/example1",
    },
    {
      id: 2,
      teacher: "Tran Thi B",
      subject: "English",
      level: "Intermediate",
      startTime: "2025-12-24T09:00:00",
      endTime: "2025-12-24T10:30:00",
      discordLink: "https://discord.gg/example2",
    },
  ]);

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= HELPERS ================= */
  const getStatus = (start: Date, end: Date): SessionStatus => {
    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "learning";
    return "finished";
  };

  const formatCountdown = (start: Date): string => {
    const diff = start.getTime() - now.getTime();
    if (diff <= 0) return "00:00:00";

    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleStartLearning = (
    status: SessionStatus,
    discordLink: string
  ) => {
    if (status === "upcoming") {
      alert("❌ Chưa đến giờ học");
      return;
    }

    if (status === "learning") {
      alert(`✅ Vào lớp học tại Discord:\n${discordLink}`);
      // sau này có thể: window.open(discordLink, "_blank");
      return;
    }

    alert("⚠️ Buổi học đã kết thúc");
  };

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-10">
          Buổi học của tôi
        </h1>

        <table className="w-full border-collapse text-slate-900 dark:text-slate-100">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Giáo viên</th>
              <th className="p-4 text-left">Môn học</th>
              <th className="p-4 text-left">Trình độ</th>
              <th className="p-4 text-left">Ngày học</th>
              <th className="p-4 text-left">Giờ học</th>
              <th className="p-4 text-left">Đếm ngược</th>
              <th className="p-4 text-center">Trạng thái</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((s, index) => {
              const start = new Date(s.startTime);
              const end = new Date(s.endTime);
              const status = getStatus(start, end);

              return (
                <tr
                  key={s.id}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                  <td className="p-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="p-4">{s.teacher}</td>
                  <td className="p-4">{s.subject}</td>
                  <td className="p-4">{s.level}</td>
                  <td className="p-4">
                    {start.toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4">
                    {start.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {end.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="p-4 font-mono">
                    {status === "upcoming"
                      ? formatCountdown(start)
                      : "--:--:--"}
                  </td>

                  <td className="p-4 text-center">
                    {status === "upcoming" && (
                      <span className="text-yellow-600 font-medium">
                        ⏳ Chưa đến giờ học
                      </span>
                    )}
                    {status === "learning" && (
                      <span className="text-green-600 font-medium">
                        ▶️ Đang học
                      </span>
                    )}
                    {status === "finished" && (
                      <span className="text-slate-500 font-medium">
                        ✔️ Kết thúc
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        handleStartLearning(status, s.discordLink)
                      }
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition disabled:opacity-50"
                      disabled={status === "finished"}
                    >
                      Bắt đầu học
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
}
