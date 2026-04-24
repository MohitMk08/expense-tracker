import { motion } from "framer-motion";

export default function Insights({ expenses }) {
    if (!expenses || expenses.length === 0) return null;

    const totalExpense = expenses
        .filter((e) => (e.type || "expense") === "expense")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalCredit = expenses
        .filter((e) => e.type === "credit")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const balance = totalCredit - totalExpense;

    // 🔥 CATEGORY ANALYSIS
    const categoryMap = {};
    expenses.forEach((e) => {
        const key = e.event || "general";
        if (!categoryMap[key]) categoryMap[key] = 0;

        if ((e.type || "expense") === "expense") {
            categoryMap[key] += Number(e.amount);
        }
    });

    const topCategory = Object.entries(categoryMap).sort(
        (a, b) => b[1] - a[1]
    )[0]?.[0];

    // 🧠 INSIGHTS LOGIC
    const insights = [];

    if (totalExpense > totalCredit) {
        insights.push({
            text: "You're spending more than you earn",
            color: "var(--danger)"
        });
    }

    if (balance > 0) {
        insights.push({
            text: "You're saving money — great job",
            color: "var(--success)"
        });
    }

    if (totalExpense > 10000) {
        insights.push({
            text: "High spending detected",
            color: "var(--warning)"
        });
    }

    if (topCategory) {
        insights.push({
            text: `Top category: ${topCategory}`,
            color: "var(--primary)"
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 space-y-4"
            style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)"
            }}
        >
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                >
                    🧠 Smart Insights
                </h3>

                <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                        background: "rgba(99,102,241,0.1)",
                        color: "var(--primary)"
                    }}
                >
                    AI
                </span>
            </div>

            {/* EMPTY STATE */}
            {insights.length === 0 && (
                <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                >
                    No insights yet
                </p>
            )}

            {/* INSIGHTS LIST */}
            <div className="space-y-2">
                {insights.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-3 rounded-xl flex items-center justify-between"
                        style={{
                            background: "var(--card-soft)",
                            border: "1px solid var(--border)"
                        }}
                    >
                        <span
                            className="text-sm"
                            style={{ color: "var(--text)" }}
                        >
                            {item.text}
                        </span>

                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: item.color }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}