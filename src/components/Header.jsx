import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

export default function Header() {
    const { dark, setDark } = useTheme();
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold">Expense Tracker</h1>
                <p className="text-sm text-(--muted)">{user.email}</p>
            </div>

            <div className="flex gap-2">
                <button onClick={() => setDark(!dark)} className="px-3 py-1 rounded text-2xl font-bold text-blue-500">
                    {dark ? <CiLight /> : <MdOutlineDarkMode />}
                </button>
                <button onClick={logout} className="px-3 py-1 rounded btn">
                    Logout
                </button>
            </div>
        </div>
    );
}