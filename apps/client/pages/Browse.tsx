import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

export default function Browse() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.nav.browse}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Browse all available experts and find the perfect match for you.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-12">
            <p className="text-slate-600 dark:text-slate-400">
              This page is coming soon. Continue building to add the browse feature!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
