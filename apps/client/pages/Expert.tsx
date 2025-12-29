import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpertCard from "../components/ExpertCard";
import ExpertFilter from "../components/ExpertFilter";
import { sherpaApi, SherpaDTO } from "../api/sherpa.api";
import { addMockFields } from "../data/mockExpertsExtra";

export default function Experts() {
  const [experts, setExperts] = useState<SherpaDTO[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<SherpaDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSherpas = async () => {
      try {
        const data = (await sherpaApi.getAllSherpas()).map(addMockFields);
        setExperts(data);
        setFilteredExperts(data);
        console.log("check res", data);
      } catch (error) {
        console.error("Failed to fetch sherpas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSherpas();
  }, []);

  const handleSearch = (filters: { game?: string; priceRange?: string }) => {
    const result = experts.filter((expert) => {
      const matchGame = !filters.game || expert.game.name === filters.game;

      const matchPrice =
        !filters.priceRange ||
        (() => {
          const [min, max] = filters.priceRange.split("-").map(Number);
          return expert.hourlyRate >= min && expert.hourlyRate <= max;
        })();

      return matchGame && matchPrice;
    });

    setFilteredExperts(result);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <ExpertFilter onSearch={handleSearch} />

        {loading ? (
          <p className="text-slate-500">Loading experts...</p>
        ) : (
          <>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              {filteredExperts.length} experts are ready to help
            </p>

            <div className="space-y-6">
              {filteredExperts.map((expert) => (
                <ExpertCard key={expert._id} expert={expert} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
