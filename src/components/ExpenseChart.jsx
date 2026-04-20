import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#6366f1",
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#3b82f6",
    "#a855f7"
];

export default function ExpenseChart({ expenses }) {
    if (!expenses || expenses.length === 0) return null;

    // group by event/category
    const map = {};

    expenses.forEach((e) => {
        // ❗ ONLY EXPENSE
        if ((e.type || "expense") !== "expense") return;

        const key = e.event || "general";

        if (!map[key]) map[key] = 0;
        map[key] += Number(e.amount);
    });

    if (Object.keys(map).length === 0) {
        return (
            <div className="card text-center text-sm text-gray-500">
                No expense data for chart
            </div>
        );
    }

    const data = Object.keys(map).map((key) => ({
        name: key,
        value: map[key]
    }));

    return (
        <div className="card">
            <h3 className="text-sm font-semibold mb-3">
                📊 Expense Distribution
            </h3>

            <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}