import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateCurrency } from "../firebase/userService";
import { useCurrency } from "../context/CurrencyContext";

const currencies = [
    { code: "INR", label: "₹ INR" },
    { code: "USD", label: "$ USD" },
    { code: "EUR", label: "€ EUR" },
    { code: "GBP", label: "£ GBP" },
];

export default function Header() {
    const { dark, setDark } = useTheme();
    const { user, logout } = useAuth();
    const { currency, setCurrency } = useCurrency();

    const [open, setOpen] = useState(false);

    const handleCurrency = async (code) => {
        await updateCurrency(user.uid, code);
        setOpen(false);
    };

    return (
        <div className="flex justify-between items-center">

            {/* LEFT */}
            <div>
                <h1 className="text-2xl font-bold 
                bg-linear-to-r from-indigo-500 to-purple-500 
                bg-clip-text text-transparent">
                    Expense Tracker
                </h1>

                <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                >
                    {user.email}
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 relative">

                {/* 💱 CURRENCY DROPDOWN */}
                <div className="relative">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="appearance-none px-3 py-2 pr-8 rounded-xl text-sm font-medium
                transition-all duration-200 cursor-pointer

                border
                backdrop-blur-md

                focus:outline-none focus:ring-2

                "
                        style={{
                            background: "var(--card)",
                            color: "var(--text)",
                            borderColor: "var(--border)",
                            boxShadow: "var(--shadow-sm)",
                        }}
                    >
                        {currencies.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.label}
                            </option>
                        ))}
                    </select>

                    {/* 🔽 Custom Arrow */}
                    <div
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                        style={{ color: "var(--text-muted)" }}
                    >
                        ▼
                    </div>
                </div>

                {/* 🌗 THEME TOGGLE */}
                <button
                    onClick={() => setDark(!dark)}
                    className="p-2 rounded-lg transition"
                    style={{
                        background: "var(--card-soft)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                    }}
                >
                    {dark ? "☀️" : "🌙"}
                </button>

                {/* 🚪 LOGOUT */}
                <button
                    onClick={logout}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition"
                    style={{
                        background: "var(--danger)",
                        color: "white",
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}