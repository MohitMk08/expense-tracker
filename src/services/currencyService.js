const CACHE_KEY = "currency_rates";
const CACHE_TIME_KEY = "currency_rates_time";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// 🔥 ALWAYS INR BASE
export const getRates = async () => {
    const cachedRates = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    const now = Date.now();

    if (cachedRates && cachedTime && now - cachedTime < CACHE_DURATION) {
        return JSON.parse(cachedRates);
    }

    try {
        const res = await fetch(
            `https://api.exchangerate.host/latest?base=INR` // ✅ FIXED
        );

        const data = await res.json();

        if (!data?.rates) throw new Error("Invalid API response");

        localStorage.setItem(CACHE_KEY, JSON.stringify(data.rates));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());

        return data.rates;
    } catch (err) {
        console.error("Currency API error:", err);

        if (cachedRates) return JSON.parse(cachedRates);

        throw new Error("No currency data");
    }
};

// 🔥 SINGLE SOURCE OF TRUTH
export const convertFromINR = (amount, targetCurrency, rates) => {
    if (!rates || !rates[targetCurrency]) return amount;

    const rate = rates[targetCurrency];

    return Number(amount) * rate; // ✅ correct
};