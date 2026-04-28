import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

const STORAGE_KEY = "selected_currency";

export const CurrencyProvider = ({ children }) => {
    // ✅ Load from localStorage (initial)
    const [baseCurrency, setBaseCurrency] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || "INR";
    });

    // ✅ Save to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, baseCurrency);
    }, [baseCurrency]);

    return (
        <CurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrencyContext = () => useContext(CurrencyContext);