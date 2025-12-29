import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { LogOut, User, Mail, MapPin, Calendar, Settings } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const mockAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkDR-O7k-eacQzPYulNl1cMdaoaYAvYVGm_w&s"; // Một avatar anime nữ rất xinh
  const defaultProvider = "Google";

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const providerLabel: Record<string, string> = {
    email: language === "en" ? "Email" : "Email",
    google: "Google",
    facebook: "Facebook",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {language === "en" ? "Welcome, " : "Chào mừng, "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user.displayName}
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {language === "en"
              ? "Here's your dashboard. You can manage your profile and settings here."
              : "Đây là bảng điều khiển của bạn. Bạn có thể quản lý hồ sơ và cài đặt ở đây."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {language === "en" ? "Profile Information" : "Thông Tin Hồ Sơ"}
            </h2>

            <div className="flex items-start gap-6 mb-8">
              <div className="relative group">
                <img
                  src={mockAvatar}

                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {user.displayName || (language === "en" ? "Guest User" : "Khách")}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {/* PROVIDER: Mock nếu không có */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                    {language === "en" ? "Joined via" : "Tham gia qua"}: {defaultProvider}
                  </span>

                  {/* Badge bổ sung cho chuyên nghiệp */}
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    Verified Member
                  </span>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    {language === "en" ? "Name" : "Tên"}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.displayName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    {language === "en" ? "User ID" : "ID Người Dùng"}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                    {user.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    {language === "en" ? "Member Since" : "Thành Viên Từ"}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {new Date().toLocaleDateString(language === "en" ? "en-US" : "vi-VN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {language === "en" ? "Sign Out" : "Đăng Xuất"}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {language === "en" ? "Quick Actions" : "Hành Động Nhanh"}
              </h3>

              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-left rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium text-sm">
                  {language === "en" ? "Edit Profile" : "Chỉnh Sửa Hồ Sơ"}
                </button>
                <button className="w-full px-4 py-2 text-left rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors font-medium text-sm">
                  {language === "en" ? "Change Password" : "Đổi Mật Khẩu"}
                </button>
                <button className="w-full px-4 py-2 text-left rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm">
                  {language === "en" ? "Account Settings" : "Cài Đặt Tài Khoản"}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {language === "en" ? "Your Stats" : "Thống Kê Của Bạn"}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase mb-1">
                    {language === "en" ? "Sessions Joined" : "Buổi Tham Gia"}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase mb-1">
                    {language === "en" ? "Hours Spent" : "Giờ Dành"}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">0h</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase mb-1">
                    {language === "en" ? "Friends Made" : "Bạn Bè Tạo"}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
