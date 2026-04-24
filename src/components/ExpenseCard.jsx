import { deleteExpense } from "../firebase/expenseService";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, Badge, Button } from "../ui";
import { useCurrency } from "../context/CurrencyContext";

export default function ExpenseCard({ expense }) {
    const { user } = useAuth();
    const [showImage, setShowImage] = useState(false);
    const { formatCurrency } = useCurrency();

    if (!expense) return null;

    const isCredit = expense.type === "credit";

    const remove = async () => {
        if (expense.uid !== user?.uid) return;

        const confirmDelete = window.confirm("Delete this entry?");
        if (!confirmDelete) return;

        await deleteExpense(expense.id);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="relative overflow-hidden group transition-all">

                    {/* 🎨 LEFT ACCENT BAR */}
                    <div
                        className="absolute left-0 top-0 h-full w-1"
                        style={{
                            background: isCredit
                                ? "var(--success)"
                                : "var(--danger)",
                        }}
                    />

                    <div className="flex justify-between items-start gap-4">

                        {/* LEFT */}
                        <div className="flex flex-col gap-1">

                            <p
                                className="text-sm font-semibold tracking-tight"
                                style={{ color: "var(--text)" }}
                            >
                                {expense.description}
                            </p>

                            {expense.createdAt?.seconds && (
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {new Date(
                                        expense.createdAt.seconds * 1000
                                    ).toLocaleDateString()}
                                </p>
                            )}

                            <Badge>
                                {expense.event || "general"}
                            </Badge>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col items-end gap-2">

                            <div className="flex items-center gap-2">

                                <span
                                    className="text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                        background: isCredit
                                            ? "rgba(34,197,94,0.12)"
                                            : "rgba(239,68,68,0.12)",
                                        color: isCredit
                                            ? "var(--success)"
                                            : "var(--danger)",
                                    }}
                                >
                                    {isCredit ? "Credit" : "Expense"}
                                </span>

                                <p
                                    className="text-base font-bold"
                                    style={{
                                        color: isCredit
                                            ? "var(--success)"
                                            : "var(--danger)",
                                    }}
                                >
                                    {isCredit ? "+" : "-"}{" "}
                                    {formatCurrency(expense.amount)}
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                className="text-xs opacity-0 group-hover:opacity-100 transition"
                                onClick={remove}
                                style={{ color: "var(--danger)" }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>

                    {/* 🖼 IMAGE */}
                    {expense.imageBase64 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 overflow-hidden rounded-xl cursor-zoom-in relative border"
                            style={{ borderColor: "var(--border)" }}
                            onClick={() => setShowImage(true)}
                        >
                            <img
                                src={expense.imageBase64}
                                alt="Receipt"
                                className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                            <div
                                className="absolute inset-0 flex items-center justify-center transition"
                                style={{ background: "rgba(0,0,0,0)" }}
                                onMouseEnter={(e) =>
                                (e.currentTarget.style.background =
                                    "rgba(0,0,0,0.35)")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                    "rgba(0,0,0,0)")
                                }
                            >
                                <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition">
                                    View
                                </span>
                            </div>
                        </motion.div>
                    )}
                </Card>
            </motion.div>

            {/* 🔥 FULLSCREEN IMAGE */}
            <AnimatePresence>
                {showImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
                        style={{ background: "rgba(0,0,0,0.8)" }}
                        onClick={() => setShowImage(false)}
                    >
                        <motion.img
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.85 }}
                            src={expense.imageBase64}
                            alt="Full Receipt"
                            className="max-h-[90vh] max-w-[90vw] rounded-2xl"
                            style={{ boxShadow: "var(--shadow-md)" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}