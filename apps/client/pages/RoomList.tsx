import Header from "../components/Header";
import Footer from "../components/Footer";
// import experts from "../data/experts";
import { useLanguage } from "../context/LanguageContext";
import RoomRow from "../components/RoomRow";

export default function RoomList() {
  const { t } = useLanguage();
  const now = new Date();

  // const rooms = experts.flatMap((expert) =>
  //   expert.subjects.map((subject, index) => ({
  //     roomId: `${expert.id}-${subject.subject}-${subject.level}`,
  //     teacher: expert.name,
  //     teacherId: expert.id,
  //     subject: subject.subject,
  //     level: subject.level,

  //     // demo thời gian
  //     startTime: new Date(now.getTime() + index * 3600000).toISOString(),

  //     endTime: new Date(now.getTime() + (index + 1) * 3600000).toISOString(),
  //   })),
  // );

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
              <th className="p-4">#</th>
              <th className="p-4">{t.rooms.teacher}</th>
              <th className="p-4">{t.rooms.subject}</th>
              <th className="p-4">{t.rooms.level}</th>
              <th className="p-4">{t.rooms.date}</th>
              <th className="p-4">{t.rooms.time}</th>
              <th className="p-4">{t.rooms.status}</th>
              <th className="p-4 text-center">{t.rooms.action}</th>
            </tr>
          </thead>

          {/* <tbody>
            {rooms.map((room, index) => (
              <RoomRow key={room.roomId} room={room} index={index} t={t} />
            ))}
          </tbody> */}
        </table>
      </main>

      <Footer />
    </div>
  );
}
