import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { dark, setDark } = useTheme();

    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
            <button
                onClick={() => setDark(!dark)}
                className="px-3 py-1 rounded"
            >
                {dark ? "Light" : "Dark"}
            </button>
        </div>
    );
}