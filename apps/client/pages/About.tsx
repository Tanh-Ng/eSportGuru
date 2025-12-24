import Header from "../components/Header";
import Footer from "../components/Footer";
import experts from "../data/experts";

export default function About() {
  const rooms = experts.flatMap((expert) =>
    expert.subjects.map((subject) => {
      const isBusy = !expert.availability.some((slot) => slot.available);

      return {
        teacher: expert.name,
        subject: subject.subject,
        level: subject.level,
        isBusy,
      };
    }),
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-900 dark:text-white">
          Danh sách phòng học
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-200 dark:bg-slate-800">
                <th className="p-4 text-left">Phòng</th>
                <th className="p-4 text-left">Giáo viên</th>
                <th className="p-4 text-left">Môn học</th>
                <th className="p-4 text-left">Trình độ</th>
                <th className="p-4 text-left">Trạng thái</th>
                <th className="p-4 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-200 dark:border-slate-800"
                >
                  <td className="p-4 font-semibold">
                    Phòng {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="p-4">{room.teacher}</td>
                  <td className="p-4">{room.subject}</td>
                  <td className="p-4">{room.level}</td>
                  <td className="p-4">
                    {room.isBusy ? (
                      <span className="text-red-600 font-medium">Đang học</span>
                    ) : (
                      <span className="text-green-600 font-medium">Rảnh</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      disabled={room.isBusy}
                      className={`px-4 py-2 rounded-lg font-medium transition
                        ${
                          room.isBusy
                            ? "bg-slate-400 cursor-not-allowed text-white opacity-60"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }
                      `}
                    >
                      Bắt đầu
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
