import { deleteExpense } from "../firebase/expenseService";
import { useAuth } from "../context/AuthContext";

export default function ExpenseCard({ expense }) {
    const { user } = useAuth();

    if (!expense) return null;

    const remove = async () => {
        if (expense.uid !== user.uid) return;
        await deleteExpense(expense.id);
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex items-start justify-between gap-3">
            <div className="space-y-1">
                {/* DESCRIPTION */}
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                    {expense.description}
                </p>

                {/* DATE */}
                {expense.createdAt?.seconds && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(expense.createdAt.seconds * 1000).toLocaleDateString()}
                    </p>
                )}
            </div>

            {/* AMOUNT + DELETE */}
            <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                    ₹{expense.amount}
                </span>

                <button
                    onClick={remove}
                    className="text-xs text-red-500 hover:text-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}