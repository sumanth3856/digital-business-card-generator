import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10" />
                </div>

                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">404</h1>
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Page Not Found</h2>

                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-600/20"
                >
                    <Home className="w-5 h-5" />
                    Go Home
                </Link>
            </div>
        </div>
    );
}
