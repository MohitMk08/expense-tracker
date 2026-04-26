import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Summary({ totalExpense, totalCredit, balance }) {
    const { user } = useAuth();
    const { formatCurrency } = useCurrency();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

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
            className="p-4 rounded-xl border transition-all duration-200"
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