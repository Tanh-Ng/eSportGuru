import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { LogOut, User, Mail, MapPin, Calendar, Settings } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
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
              {user.name}
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
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {user.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  {user.provider ? (
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                      {language === "en" ? "Joined via" : "Tham gia qua"} {providerLabel[user.provider] || user.provider}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    {language === "en" ? "Email" : "Email"}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.email}
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
