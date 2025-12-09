const pendingBookings = [
  { id: 'b1', learner: 'Nova', game: 'Valorant', startTime: 'Today 20:00' },
  { id: 'b2', learner: 'Pixel', game: 'LoL', startTime: 'Tomorrow 09:00' },
];

export default function SherpaDashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Sherpa Dashboard</h1>
        <p className="text-sm text-slate-300">Accept or reject incoming bookings.</p>
      </header>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="text-lg font-semibold text-white">Pending bookings</h2>
        <div className="mt-4 space-y-3">
          {pendingBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3">
              <div>
                <p className="font-semibold text-white">{b.learner}</p>
                <p className="text-xs text-slate-400">
                  {b.game} • {b.startTime}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-emerald-400">
                  Accept
                </button>
                <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

