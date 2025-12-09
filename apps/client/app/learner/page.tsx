const confirmed = [
  { id: 'b1', sherpa: 'Astra', game: 'Valorant', startTime: 'Today 20:00', inviteLink: '#' },
  { id: 'b2', sherpa: 'Zephyr', game: 'LoL', startTime: 'Tomorrow 09:00', inviteLink: '#' },
];

export default function LearnerDashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">My Learnings</h1>
        <p className="text-sm text-slate-300">Join confirmed Discord rooms directly.</p>
      </header>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="text-lg font-semibold text-white">Confirmed sessions</h2>
        <div className="mt-4 space-y-3">
          {confirmed.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3">
              <div>
                <p className="font-semibold text-white">{booking.sherpa}</p>
                <p className="text-xs text-slate-400">
                  {booking.game} • {booking.startTime}
                </p>
              </div>
              <a
                href={booking.inviteLink}
                className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-400"
              >
                Join Discord Room
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

