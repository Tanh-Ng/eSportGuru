import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
    title: 'eSportGuru',
    description: 'Find and book elite Sherpas for eSports coaching',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-slate-950 text-slate-100">
                <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <span className="text-lg font-semibold">eSportGuru</span>
                        <nav className="flex gap-4 text-sm text-slate-300">
                            <a href="/" className="hover:text-white">Home</a>
                            <a href="/sherpa" className="hover:text-white">Sherpa Dashboard</a>
                            <a href="/learner" className="hover:text-white">Learner Dashboard</a>
                        </nav>
                    </div>
                </header>
                <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
            </body>
        </html>
    );
}

