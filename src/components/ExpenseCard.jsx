import { deleteExpense } from "../firebase/expenseService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function ExpenseCard({ expense }) {
    const { user } = useAuth();

    if (!expense) return null;

    const remove = async () => {
        if (expense.uid !== user?.uid) return;

        const confirmDelete = window.confirm("Delete this entry?");
        if (!confirmDelete) return;

        await deleteExpense(expense.id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="card cursor-pointer"
        >
            {/* 🔹 TOP SECTION */}
            <div className="flex justify-between items-start gap-3">

                {/* LEFT SIDE */}
                <div className="flex flex-col gap-1">

                    {/* DESCRIPTION */}
                    <p className="text-sm font-medium">
                        {expense.description}
                    </p>

                    {/* DATE */}
                    {expense.createdAt?.seconds && (
                        <p className="text-xs" style={{ color: "var(--muted)" }}>
                            {new Date(
                                expense.createdAt.seconds * 1000
                            ).toLocaleDateString()}
                        </p>
                    )}

                    {/* EVENT TAG */}
                    <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 w-fit">
                        {expense.event || "general"}
                    </span>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end gap-1">

                    {/* AMOUNT */}
                    <p
                        className={`text-base font-semibold ${expense.type === "credit"
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                    >
                        {expense.type === "credit" ? "+" : "-"} ₹
                        {expense.amount}
                    </p>

                    {/* DELETE */}
                    <button
                        onClick={remove}
                        className="text-xs text-red-400 hover:text-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* 🔹 IMAGE */}
            {expense.imageBase64 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 overflow-hidden rounded-xl"
                >
                    <img
                        src={expense.imageBase64}
                        alt="Receipt"
                        className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </motion.div>
            )}
        </motion.div>
    );
}