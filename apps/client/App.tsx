import "./global.css";

import { Toaster } from "../client/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "../client/components/ui/sonner";
import { TooltipProvider } from "../client/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../client/context/ThemeContext";
import { LanguageProvider } from "../client/context/LanguageContext";
import { AuthProvider } from "../client/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoomList from "./pages/RoomList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Experts from "./pages/Expert";
import ExpertDetail from "./pages/ExpertDetail";
import MyLearningSessions from "./pages/MyLearningSessions";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/my_session" element={<MyLearningSessions />} />
                <Route path="/about" element={<RoomList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/experts" element={<Experts />} />
                <Route path="/experts/:id" element={<ExpertDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
