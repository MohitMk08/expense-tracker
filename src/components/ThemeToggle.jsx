import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            className="
      px-3 py-2 rounded-xl text-sm
      bg-gray-300 dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      hover:opacity-90 transition
      "
        >
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    )
}