export default function Summary({ totalExpense, totalCredit, balance }) {
    return (
        <div className="grid grid-cols-3 gap-3">

            <SummaryCard
                label="Expense"
                value={totalExpense}
                color="var(--danger)"
            />

            <SummaryCard
                label="Credit"
                value={totalCredit}
                color="var(--success)"
            />

            <SummaryCard
                label="Balance"
                value={balance}
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
                className="text-lg font-semibold"
                style={{ color }}
            >
                ₹{value}
            </p>
        </div>
    );
}