export default function Toggle({ value, onChange }) {
    const isExpense = value === "expense";

    return (
        <div
            className="flex p-1 rounded-full transition-all"
            style={{
                background: "var(--card-soft)",
                border: "1px solid var(--border)"
            }}
        >
            {/* EXPENSE */}
            <button
                type="button"
                onClick={() => onChange("expense")}
                className="flex-1 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                    background: isExpense ? "var(--card)" : "transparent",
                    color: isExpense ? "var(--danger)" : "var(--text-muted)",
                    boxShadow: isExpense ? "var(--shadow)" : "none"
                }}
            >
                Expense
            </button>

            {/* CREDIT */}
            <button
                type="button"
                onClick={() => onChange("credit")}
                className="flex-1 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                    background: !isExpense ? "var(--card)" : "transparent",
                    color: !isExpense ? "var(--success)" : "var(--text-muted)",
                    boxShadow: !isExpense ? "var(--shadow)" : "none"
                }}
            >
                Credit
            </button>
        </div>
    );
}