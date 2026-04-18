import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect } from "react";

export default function Header() {
    const { dark, setDark } = useTheme();
    const { user, logout } = useAuth();

    return (
        // <div className="flex justify-between items-center">
        //     {/* 🔹 LEFT SIDE */}
        //     <div>
        //         <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        //             Expense Tracker
        //         </h1>
        //         <p className="text-xs sm:text-sm  dark:text-gray-400">
        //             {user?.email}
        //         </p>
        //     </div>

        //     {/* 🔹 RIGHT SIDE */}
        //     <div className="flex items-center gap-2">

        //         {/* 🌗 THEME TOGGLE */}
        //         <button
        //             onClick={() => setDark(!dark)}
        //             className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 
        //             bg-white dark:bg-gray-800 
        //             hover:scale-105 active:scale-95 transition-all"
        //         >
        //             {dark ? (
        //                 <CiLight className="text-lg text-yellow-400" />
        //             ) : (
        //                 <MdOutlineDarkMode className="text-lg text-gray-700" />
        //             )}
        //         </button>

        //         {/* 🚪 LOGOUT BUTTON */}
        //         <button
        //             onClick={logout}
        //             className="px-3 py-2 rounded-xl text-sm font-medium 
        //             bg-red-500 text-white 
        //             hover:bg-red-600 active:scale-95 transition-all duration-200 active:scale-95 shadow-sm"
        //         >
        //             Logout
        //         </button>
        //     </div>
        // </div>

        <div className="flex justify-between items-center mb-2">

            <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Expense Tracker
                </h1>
                <p className="text-xs  dark:text-gray-400">
                    {user.email}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setDark(!dark)}
                    className="btn border dark:border-gray-700 transition-all duration-200 active:scale-95"
                >
                    {dark ? "☀️" : "🌙"}
                </button>

                <button
                    onClick={logout}
                    className="btn btn-danger transition-all duration-200 active:scale-95"
                >
                    Logout
                </button>
            </div>
        </div >
    );
}