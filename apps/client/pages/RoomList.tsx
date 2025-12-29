import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLanguage } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import { getBookingsForLearner, getInviteLink } from "../api/booking.api"
import { useAuth } from "../context/AuthContext"

type Booking = {
  id: string
  sherpaId: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
  startTime: string
  endTime: string
}

export default function RoomList() {
  const { t } = useLanguage()
  const [bookings, setBookings] = useState<Booking[]>([])
  const { user } = useAuth();


  // const learnerId = "694bb3c906b4a62f2730c38e" // lấy từ auth context sau
  const learnerId = user?.id // lấy từ auth context sau
  console.log("check lernerId", learnerId);

  useEffect(() => {
    getBookingsForLearner(learnerId).then(setBookings)
  }, [])

  const handleStart = async (bookingId: string) => {
    const res = await getInviteLink(bookingId)
    window.open(res.inviteLink, "_blank")
  }

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
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">{t.rooms.sherpa}</th>
              <th className="p-4 text-left">{t.rooms.time}</th>
              <th className="p-4 text-left">{t.rooms.status}</th>
              <th className="p-4 text-center">{t.rooms.action}</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => {
              const start = new Date(b.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })

              const end = new Date(b.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })

              return (
                <tr key={b.id} className="border-b dark:border-slate-800">
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4">{b.sherpaId}</td>

                  <td className="p-4">
                    {start} - {end}
                  </td>

                  <td className="p-4">{b.status}</td>

                  <td className="p-4 text-center">
                    {b.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleStart(b.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        {t.rooms.start}
                      </button>
                    )}

                    {b.status === "PENDING" && (
                      <span className="text-yellow-500">
                        {t.rooms.waiting}
                      </span>
                    )}

                    {b.status === "CANCELLED" && (
                      <span className="text-red-500">
                        {t.rooms.cancelled}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  )
}
