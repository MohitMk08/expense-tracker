import ExpenseCard from "./ExpenseCard";
import Loader from "./Loader";

const ExpenseList = ({ expenses }) => {

    // 🔹 LOADING STATE
    if (!expenses) {
        return (
            <div className="space-y-3 flex justify-center py-6">
                <Loader />
            </div>
        );
    }

    // 🔹 EMPTY STATE
    if (expenses.length === 0) {
        return (
            <div className="text-center py-10 border border-dashed rounded-2xl 
                border-gray-300 dark:border-gray-700">

                <p className="dark:text-gray-400 text-sm">
                    No transactions yet
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    Start by adding your first expense 💸
                </p>
            </div>
        );
    }

    // 🔹 LIST
    return (
        <div className="space-y-3">
            {expenses.map((expense, index) => (
                <div
                    key={expense.id}
                    className="animate-fadeIn"
                    style={{
                        animationDelay: `${index * 50}ms`,
                    }}
                >
                    <ExpenseCard expense={expense} />
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;