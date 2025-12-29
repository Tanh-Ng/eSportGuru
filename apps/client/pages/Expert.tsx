import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpertCard from "../components/ExpertCard";
import ExpertFilter from "../components/ExpertFilter";
import { sherpaApi, SherpaDTO } from "../api/sherpa.api";
// import { addMockFields } from "../data/mockExpertsExtra"; // Dùng nếu muốn đắp thêm ảnh anime

export default function Experts() {
  const [experts, setExperts] = useState<SherpaDTO[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<SherpaDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSherpas = async () => {
      try {
        setLoading(true);
        const data = await sherpaApi.getAllSherpas();
        console.log(data);

        // Nếu bạn muốn ép ảnh anime cho những người chưa có avatar ở database:
        // const enrichedData = data.map(expert => expert.avatar ? expert : addMockFields(expert));

        setExperts(data);
        setFilteredExperts(data);
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
      // 1. Lọc theo Game
      const matchGame = !filters.game || expert.game.name === filters.game;

      // 2. Lọc theo Giá
      let matchPrice = true;
      if (filters.priceRange && filters.priceRange !== "all") {
        const parts = filters.priceRange.split("-");
        if (parts.length === 2) {
          const min = Number(parts[0]);
          const max = Number(parts[1]);
          matchPrice = expert.hourlyRate >= min && expert.hourlyRate <= max;
        }
      }

      return matchGame && matchPrice;
    });

    setFilteredExperts(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Tăng trải nghiệm người dùng bằng Header đơn giản */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Find your Coach</h1>
          <p className="text-slate-500">Learn from the best players in the world.</p>
        </div>

        <ExpertFilter onSearch={handleSearch} />

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading experts...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Showing <span className="text-indigo-600 dark:text-indigo-400">{filteredExperts.length}</span> experts
              </p>
            </div>

            {filteredExperts.length > 0 ? (
              <div className="space-y-6">
                {filteredExperts.map((expert) => (
                  <ExpertCard key={expert._id} expert={expert} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500">No experts found matching your filters.</p>
                <button
                  onClick={() => handleSearch({})}
                  className="mt-4 text-indigo-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}