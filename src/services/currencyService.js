const CACHE_KEY = "currency_rates";
const CACHE_TIME_KEY = "currency_rates_time";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getRates = async (base = "INR") => {
    const cachedRates = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    const now = Date.now();

    if (cachedRates && cachedTime && now - cachedTime < CACHE_DURATION) {
        return JSON.parse(cachedRates);
    }

    try {
        const res = await fetch(
            `https://api.exchangerate.host/latest?base=${base}`
        );
        const data = await res.json();

        localStorage.setItem(CACHE_KEY, JSON.stringify(data.rates));
        localStorage.setItem(CACHE_TIME_KEY, now);

        return data.rates;
    } catch (err) {
        if (cachedRates) return JSON.parse(cachedRates);
        throw new Error("No currency data");
    }
};

export const convertFromINR = (amount, to, rates) => {
    if (!rates) return amount;
    if (to === "INR") return amount;

    return amount * rates[to];
};