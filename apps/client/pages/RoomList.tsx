import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLanguage } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import {
  getBookingsForSherpa,
  getInviteLink,
  confirmBooking,
  rejectBooking,
} from "../api/booking.api"
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
  const { user } = useAuth()

  const sherpaId = user?.id
  console.log("check sherpa", sherpaId);

  useEffect(() => {
    if (!sherpaId) return
    getBookingsForSherpa(sherpaId).then(setBookings)
  }, [sherpaId])
  console.log("bookings", bookings);

  const handleConfirm = async (bookingId: string) => {
    await confirmBooking(bookingId)
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId ? { ...b, status: "CONFIRMED" } : b
      )
    )
  }

  const handleReject = async (bookingId: string) => {
    await rejectBooking(bookingId)
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId ? { ...b, status: "CANCELLED" } : b
      )
    )
  }

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
              <th className="p-4 text-left">Learner ID</th>
              <th className="p-4 text-left">{t.rooms.time}</th>
              <th className="p-4 text-left">Notes</th>
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

                  {/* Learner ID */}
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                    {b.learnerId}
                  </td>

                  {/* Time */}
                  <td className="p-4">
                    {start} - {end}
                  </td>

                  {/* Notes */}
                  <td className="p-4 text-sm italic">
                    {b.notes || "—"}
                  </td>

                  {/* Status */}
                  <td className="p-4">{b.status}</td>

                  {/* Action */}
                  <td className="p-4 text-center">
                    {b.status === "PENDING" && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleConfirm(b.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Chấp nhận
                        </button>

                        <button
                          onClick={() => handleReject(b.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Từ chối
                        </button>
                      </div>
                    )}

                    {b.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleStart(b.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        {t.rooms.start}
                      </button>
                    )}

                    {b.status === "CANCELLED" && (
                      <span className="text-slate-400">—</span>
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
