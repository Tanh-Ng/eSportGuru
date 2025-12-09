const sherpas = [
    {
        id: 's1',
        name: 'Astra',
        game: 'Valorant',
        rate: '$25/hr',
        tagline: 'Radiant coach with VOD reviews',
    },
    {
        id: 's2',
        name: 'Zephyr',
        game: 'League of Legends',
        rate: '$30/hr',
        tagline: 'Macro-first, role-flexible challenger',
    },
    {
        id: 's3',
        name: 'Rogue',
        game: 'CS:GO',
        rate: '$22/hr',
        tagline: 'Aim labs + scrim strategy',
    },
];

export default function HomePage() {
    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
                <h1 className="text-2xl font-semibold text-white">Top Sherpas</h1>
                <p className="mt-1 text-sm text-slate-300">
                    Book high-ELO coaches and jump into Discord instantly.
                </p>
            </section>

            <div className="grid gap-4 md:grid-cols-3">
                {sherpas.map((sherpa) => (
                    <div key={sherpa.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold text-white">{sherpa.name}</p>
                                <p className="text-sm text-slate-400">{sherpa.game}</p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                                {sherpa.rate}
                            </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{sherpa.tagline}</p>
                        <button className="mt-4 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400">
                            Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

