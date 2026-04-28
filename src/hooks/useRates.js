import { useEffect, useState } from "react";

export const useRates = () => {
    const [rates, setRates] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch(
                    "https://api.exchangerate-api.com/v4/latest/INR"
                );

                const data = await res.json();

                console.log("API response:", data); // 👈 debug

                // ✅ IMPORTANT: set ONLY rates
                setRates(data.rates);

            } catch (err) {
                console.error("Rate fetch failed", err);

                // ✅ fallback (important)
                setRates({
                    INR: 1,
                    USD: 0.012,
                    EUR: 0.011,
                    GBP: 0.009
                });
            }
        };

        fetchRates();
    }, []);

    return { rates };
};