import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Moon, Sun, Globe, LogOut } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              EG
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Esport Guru
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/browse"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-sm"
            >
              {t.nav.browse}
            </Link>
            <Link
              to="/become-expert"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-sm"
            >
              {t.nav.becomeTeacher}
            </Link>
            <Link
              to="/about"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-sm"
            >
              {t.nav.about}
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Globe size={20} className="text-slate-600 dark:text-slate-300" />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${language === "en"
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200"
                      }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("vi");
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-t border-slate-200 dark:border-slate-700 ${language === "vi"
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200"
                      }`}
                  >
                    Tiếng Việt
                  </button>
                </div>
              )}
            </div>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-slate-600" />
              ) : (
                <Sun size={20} className="text-slate-300" />
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors"
                >
                  {language === "en" ? "Dashboard" : "Bảng Điều Khiển"}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  {language === "en" ? "Logout" : "Đăng Xuất"}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                {t.hero.cta}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
