import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { updateCurrency } from "../firebase/userService";
import { useCurrencyContext } from "../context/CurrencyContext";

const currencies = [
    { code: "INR", label: "₹ INR" },
    { code: "USD", label: "$ USD" },
    { code: "EUR", label: "€ EUR" },
    { code: "GBP", label: "£ GBP" },
];

export default function Header() {
    const { dark, setDark } = useTheme();
    const { user, logout } = useAuth();

    // ✅ FIXED: correct names
    const { baseCurrency, setBaseCurrency } = useCurrencyContext();

    const handleCurrency = async (code) => {
        // ✅ Update UI immediately (important)
        setBaseCurrency(code);

        // ✅ Sync with backend (optional but good)
        if (user?.uid) {
            try {
                await updateCurrency(user.uid, code);
            } catch (err) {
                console.error("Currency update failed", err);
            }
        }
    };

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            {/* LEFT */}
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Expense Tracker
                </h1>

                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {user?.email}
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between gap-2 w-full md:w-auto">

                {/* Currency */}
                <div className="relative w-full md:w-auto">
                    <select
                        value={baseCurrency} // ✅ FIXED
                        onChange={(e) => handleCurrency(e.target.value)} // ✅ FIXED
                        className="w-full md:w-auto appearance-none px-3 py-2 pr-8 rounded-xl text-sm font-medium"
                        style={{
                            background: "var(--card)",
                            color: "var(--text)",
                            border: "1px solid var(--border)",
                        }}
                    >
                        {currencies.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.label}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                        ▼
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2 rounded-lg"
                        style={{
                            background: "var(--card-soft)",
                            border: "1px solid var(--border)",
                        }}
                    >
                        {dark ? "☀️" : "🌙"}
                    </button>

                    <button
                        onClick={logout}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                            background: "var(--danger)",
                            color: "white",
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}