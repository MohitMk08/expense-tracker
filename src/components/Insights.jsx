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
        if (!categoryMap[e.event]) categoryMap[e.event] = 0;
        if ((e.type || "expense") === "expense") {
            categoryMap[e.event] += Number(e.amount);
        }
    });

    const topCategory = Object.entries(categoryMap).sort(
        (a, b) => b[1] - a[1]
    )[0]?.[0];

    // 🧠 INSIGHTS LOGIC
    const insights = [];

    if (totalExpense > totalCredit) {
        insights.push("⚠️ You're spending more than you earn");
    }

    if (balance > 0) {
        insights.push("💰 Good job! You're saving money");
    }

    if (totalExpense > 10000) {
        insights.push("💸 High spending detected");
    }

    if (topCategory) {
        insights.push(`🔥 Top category: ${topCategory}`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 border 
bg-white dark:bg-gray-900 
border-gray-200 dark:border-gray-800 
shadow-sm space-y-3"
        >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">🧠 Smart Insights</h3>

            {insights.length === 0 && (
                <p style={{ color: "var(--muted)" }} className="text-sm">
                    No insights yet
                </p>
            )}

            {insights.map((text, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm p-2 rounded-lg 
bg-gray-100 dark:bg-gray-800 
text-gray-800 dark:text-gray-200"
                >
                    {text}
                </motion.div>
            ))}
        </motion.div>
    );
}