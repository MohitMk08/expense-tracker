import { useCurrencyContext } from "../context/CurrencyContext";
import { useRates } from "../hooks/useRates";
import { convertFromINR } from "../services/currencyService";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

const symbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
};

export default function Summary({ totalExpense, totalCredit, balance }) {
    const { baseCurrency } = useCurrencyContext();
    const { rates } = useRates();

    // ✅ SAFE conversion helper
    const convert = (amount) =>
        rates
            ? convertFromINR(Number(amount), baseCurrency, rates)
            : Number(amount);

    // ✅ Convert ALL from INR (consistent)
    const convertedExpense = convert(totalExpense);
    const convertedIncome = convert(totalCredit);
    const convertedBalance = convert(balance); // 🔥 FIXED

    // ✅ Animate AFTER conversion
    const animatedExpense = useAnimatedNumber(convertedExpense);
    const animatedIncome = useAnimatedNumber(convertedIncome);
    const animatedBalance = useAnimatedNumber(convertedBalance);

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            <SummaryCard
                label="Expense"
                value={`${symbols[baseCurrency] || "₹"} ${animatedExpense.toFixed(2)}`}
                color="var(--danger)"
            />

            <SummaryCard
                label="Credit"
                value={`${symbols[baseCurrency] || "₹"} ${animatedIncome.toFixed(2)}`}
                color="var(--success)"
            />

            <SummaryCard
                label="Balance"
                value={`${symbols[baseCurrency] || "₹"} ${animatedBalance.toFixed(2)}`}
                color="var(--primary)"
            />

        </div>
    );
}

function SummaryCard({ label, value, color }) {
    return (
        <div
            className="min-w-30 shrink p-4 rounded-xl border transition-all duration-200 lg:w-full"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <p
                className="text-xs mb-1"
                style={{ color: "var(--text-muted)" }}
            >
                {label}
            </p>

            <p
                className="text-base sm:text-lg font-semibold wrap-break-words"
                style={{ color }}
            >
                {value}
            </p>
        </div>
    );
}