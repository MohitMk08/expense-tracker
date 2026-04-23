import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect } from "react";

export default function Header() {
    const { dark, setDark } = useTheme();
    const { user, logout } = useAuth();

    return (

        <div className="flex justify-between items-center mb-4 
text-gray-900 dark:text-gray-100">

            <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Expense Tracker
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setDark(!dark)}
                    className="p-2 rounded-lg 
bg-gray-200 dark:bg-gray-800 
text-gray-800 dark:text-gray-200 
hover:scale-105 transition"
                >
                    {dark ? "☀️" : "🌙"}
                </button>

                <button
                    onClick={logout}
                    className="px-3 py-1 rounded-lg 
bg-red-500 text-white 
hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div >
    );
}