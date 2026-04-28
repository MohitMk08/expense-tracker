import { convertFromINR } from "../services/currencyService";

const symbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
};

export const formatCurrencyValue = (
    amount,
    baseCurrency,
    rates
) => {
    if (!amount && amount !== 0) return "";

    const converted = rates
        ? convertFromINR(amount, baseCurrency, rates)
        : amount;

    return `${symbols[baseCurrency] || baseCurrency} ${converted.toFixed(2)}`;
};