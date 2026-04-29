import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { Card } from "../ui";
import { useCurrencyContext } from "../context/CurrencyContext";
import { useRates } from "../hooks/useRates";
import { convertFromINR } from "../services/currencyService";
import { formatCurrencyValue } from "../utils/currencyFormatter";

const COLORS = [
    "var(--primary)",
    "var(--success)",
    "var(--danger)",
    "#f59e0b",
    "#3b82f6",
    "#a855f7"
];

export default function ExpenseChart({ expenses }) {
    const { baseCurrency } = useCurrencyContext();
    const { rates } = useRates();

    if (!expenses || expenses.length === 0) return null;

    const map = {};

    // ✅ Build category totals (INR)
    expenses.forEach((e) => {
        if ((e.type || "expense") !== "expense") return;

        const key = (e.event || "general").trim();

        if (!map[key]) map[key] = 0;
        map[key] += Number(e.amount);
    });

    if (Object.keys(map).length === 0) {
        return (
            <Card className="text-center text-sm">
                <p style={{ color: "var(--text-muted)" }}>
                    No expense data for chart
                </p>
            </Card>
        );
    }

    // ✅ Convert AFTER summing (important)
    const data = Object.keys(map).map((key, index) => {
        const convertedValue = rates
            ? convertFromINR(map[key], baseCurrency, rates)
            : map[key];

        return {
            name: key,
            value: convertedValue,
            fill: COLORS[index % COLORS.length],
        };
    });

    const totalINR = Object.values(map).reduce((sum, val) => sum + val, 0);

    const total = rates
        ? convertFromINR(totalINR, baseCurrency, rates)
        : totalINR;

    return (
        <Card className="space-y-4">

            <h3
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
            >
                📊 Expense Breakdown
            </h3>

            <div id="chart-export" className="w-full h-64 relative">
                <ResponsiveContainer width="100%" height={260} >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            innerRadius={60}
                            paddingAngle={3}
                        />

                        {/* ✅ Tooltip fixed */}
                        <Tooltip
                            formatter={(value) =>
                                formatCurrencyValue(value, baseCurrency, rates)
                            }
                            contentStyle={{
                                background: "var(--card)",
                                borderRadius: "12px",
                                border: "1px solid var(--border)",
                                color: "var(--text)",
                                boxShadow: "var(--shadow)",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* CENTER */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Total
                    </p>
                    <p
                        className="text-xl font-bold"
                        style={{ color: "var(--text)" }}
                    >
                        {formatCurrencyValue(totalINR, baseCurrency, rates)}
                    </p>
                </div>
            </div>

            {/* LEGEND */}
            <div className="space-y-2">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 rounded-xl transition"
                        style={{
                            background: "var(--card-soft)",
                            border: "1px solid var(--border)"
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.fill }}
                            />
                            <span
                                className="text-sm font-medium"
                                style={{ color: "var(--text)" }}
                            >
                                {item.name}
                            </span>
                        </div>

                        <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {formatCurrencyValue(item.value, baseCurrency, rates)}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}