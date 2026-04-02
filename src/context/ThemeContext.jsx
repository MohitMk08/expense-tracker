import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    // ✅ Better initial theme (no flicker)
    const getInitialTheme = () => {
        const saved = localStorage.getItem("theme");

        if (saved) return saved === "dark";

        // fallback to system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const [dark, setDark] = useState(getInitialTheme);

    // ✅ Apply theme globally
    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);