import { deleteExpense } from "../firebase/expenseService";
import { useAuth } from "../context/AuthContext";

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
        <div
            className="group rounded-2xl border border-gray-200 dark:border-gray-800 
            bg-white dark:bg-gray-900 
            p-4 shadow-sm 
            hover:shadow-md hover:-translate-y-0.5 
            transition-all duration-300"
        >
            {/* 🔹 TOP */}
            <div className="flex justify-between items-start gap-3">

                {/* LEFT */}
                <div className="flex-1 space-y-1">

                    {/* DESCRIPTION */}
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-snug">
                        {expense.description}
                    </p>

                    {/* DATE + EVENT */}
                    <div className="flex items-center gap-2 flex-wrap">

                        {expense.createdAt?.seconds && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(
                                    expense.createdAt.seconds * 1000
                                ).toLocaleDateString()}
                            </span>
                        )}

                        <span
                            className="text-[10px] px-2 py-1 rounded-full 
                            bg-indigo-50 text-indigo-600 
                            dark:bg-indigo-900/40 dark:text-indigo-300"
                        >
                            {expense.event || "general"}
                        </span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="text-right flex flex-col items-end gap-1">

                    {/* AMOUNT */}
                    <p
                        className={`text-sm sm:text-base font-semibold ${expense.type === "credit"
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                    >
                        {expense.type === "credit" ? "+" : "-"} ₹{expense.amount}
                    </p>

                    {/* DELETE */}
                    <button
                        onClick={remove}
                        className="text-[11px] text-gray-400 hover:text-red-500 
                        opacity-0 group-hover:opacity-100 
                        transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* 🔹 IMAGE */}
            {expense.imageBase64 && (
                <div className="mt-3 overflow-hidden rounded-xl">
                    <img
                        src={expense.imageBase64}
                        alt="Receipt"
                        className="h-40 w-full object-cover 
                        transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                </div>
            )}
        </div>
    );
}