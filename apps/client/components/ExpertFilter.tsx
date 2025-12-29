import React, { useState } from "react";

type ExpertFilters = {
    game?: string;
    priceRange?: string;
};

type Props = {
    onSearch: (filters: ExpertFilters) => void;
};

export default function ExpertFilter({ onSearch }: Props) {
    const [game, setGame] = useState("");
    const [priceRange, setPriceRange] = useState("");

    return (
        <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                Find an expert by game and price
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* GAME */}
                <select
                    className="input"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                >
                    <option value="">All Games</option>
                    <option value="Valorant">Valorant</option>
                    <option value="CSGO">CS:GO</option>
                    <option value="LoL">League of Legends</option>
                </select>

                {/* PRICE */}
                <select
                    className="input"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                >
                    <option value="">Any Price</option>
                    <option value="0-500">Below 500</option>
                    <option value="500-1000">500 – 1000</option>
                    <option value="1000-2000">1000 – 2000</option>
                </select>

                {/* BUTTON */}
                <button
                    onClick={() => onSearch({ game, priceRange })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 font-medium"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
