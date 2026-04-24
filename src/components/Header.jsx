import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { dark, setDark } = useTheme();
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center">

            {/* LEFT */}
            <div>
                <h1
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, var(--primary), #a855f7)",
                    }}
                >
                    Expense Tracker
                </h1>

                <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-muted)" }}
                >
                    {user.email}
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">

                {/* 🌙 THEME TOGGLE */}
                <button
                    onClick={() => setDark(!dark)}
                    className="p-2 rounded-lg transition-all duration-200 active:scale-95"
                    style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                        color: "var(--text)",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.background = "var(--card-soft)")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.background = "var(--card)")
                    }
                >
                    {dark ? "☀️" : "🌙"}
                </button>

                {/* 🚪 LOGOUT */}
                <button
                    onClick={logout}
                    className="px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95"
                    style={{
                        background: "var(--danger)",
                        color: "#fff",
                        boxShadow: "var(--shadow-sm)",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.opacity = "1")
                    }
                >
                    Logout
                </button>
            </div>
        </div>
    );
}