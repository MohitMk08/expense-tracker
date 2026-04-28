import { useCurrencyContext } from "../context/CurrencyContext";
import { useRates } from "../hooks/useRates";
import { convertFromINR } from "../services/currencyService";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

export default function Summary({ totalExpense, totalCredit, balance }) {
    const { baseCurrency } = useCurrencyContext();
    const { rates } = useRates();

    // ✅ Convert from INR → selected currency
    const convertedExpense = rates
        ? convertFromINR(totalExpense, baseCurrency, rates)
        : totalExpense;

    const convertedIncome = rates
        ? convertFromINR(totalCredit, baseCurrency, rates)
        : totalCredit;

    const convertedBalance = convertedIncome - convertedExpense;

    // ✅ Animate values
    const animatedExpense = useAnimatedNumber(convertedExpense);
    const animatedIncome = useAnimatedNumber(convertedIncome);
    const animatedBalance = useAnimatedNumber(convertedBalance);

    // ✅ Currency symbols
    const symbols = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            <SummaryCard
                label="Expense"
                value={`${symbols[baseCurrency]} ${animatedExpense.toFixed(2)}`}
                color="var(--danger)"
            />

            <SummaryCard
                label="Credit"
                value={`${symbols[baseCurrency]} ${animatedIncome.toFixed(2)}`}
                color="var(--success)"
            />

            <SummaryCard
                label="Balance"
                value={`${symbols[baseCurrency]} ${animatedBalance.toFixed(2)}`}
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