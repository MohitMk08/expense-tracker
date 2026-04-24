import { CURRENCIES } from "../config/currency";

export function formatCurrency(amount, currency = "INR") {
    const config = CURRENCIES[currency] || CURRENCIES["INR"];

    return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency,
    }).format(amount);
}