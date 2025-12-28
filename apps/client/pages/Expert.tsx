import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpertCard from "../components/ExpertCard";
import ExpertFilter from "../components/ExpertFilter";
import experts from "../data/experts";

export default function Experts() {
  const [filteredExperts, setFilteredExperts] = useState(experts);
  type ExpertFilters = {
    subject?: string
    level?: string
    budget?: string
  }
  const handleSearch = (filters: ExpertFilters) => {
    const result = experts.filter((expert) => {
      return (
        (!filters.subject || expert.category === filters.subject) &&
        (!filters.level || expert.levels.includes(filters.level)) &&
        (!filters.budget || expert.budget === filters.budget)
      )
    })

    setFilteredExperts(result)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <ExpertFilter onSearch={handleSearch} />

        <p className="mb-6 text-slate-600 dark:text-slate-400">
          {filteredExperts.length} experts are ready to help
        </p>

        <div className="space-y-6">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
