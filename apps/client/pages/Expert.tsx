import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpertCard from "../components/ExpertCard";
import ExpertFilter from "../components/ExpertFilter";
import experts from "../data/experts";

export default function Experts() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <ExpertFilter />

        <p className="mb-6 text-slate-600 dark:text-slate-400">
          {experts.length} experts are ready to help
        </p>

        <div className="space-y-6">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
