import { useEffect, useState } from "react";

const CACHE_KEY = "currency_rates";
const CACHE_TIME_KEY = "currency_rates_time";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const useRates = () => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const cachedRates = localStorage.getItem(CACHE_KEY);
                const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

                const now = Date.now();

                // ✅ USE CACHE FIRST
                if (
                    cachedRates &&
                    cachedTime &&
                    now - Number(cachedTime) < CACHE_DURATION
                ) {
                    setRates(JSON.parse(cachedRates));
                    setLoading(false);
                    return;
                }

                // ✅ API CALL (INR BASE ONLY)
                const res = await fetch(
                    "https://api.exchangerate-api.com/v4/latest/INR"
                );

                const data = await res.json();

                if (!data?.rates) throw new Error("Invalid API");

                // ✅ SAVE CACHE
                localStorage.setItem(CACHE_KEY, JSON.stringify(data.rates));
                localStorage.setItem(CACHE_TIME_KEY, now.toString());

                setRates(data.rates);
            } catch (err) {
                console.error("Rate fetch failed", err);

                // ✅ SAFE FALLBACK
                setRates({
                    INR: 1,
                    USD: 0.012,
                    EUR: 0.011,
                    GBP: 0.009,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    return { rates, loading };
};