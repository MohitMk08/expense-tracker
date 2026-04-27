import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Summary({ totalExpense, totalCredit, balance }) {
    const { user } = useAuth();
    const { formatCurrency } = useCurrency();

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            <SummaryCard
                label="Expense"
                value={formatCurrency(totalExpense)}
                color="var(--danger)"
            />

            <SummaryCard
                label="Credit"
                value={formatCurrency(totalCredit)}
                color="var(--success)"
            />

            <SummaryCard
                label="Balance"
                value={formatCurrency(balance)}
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