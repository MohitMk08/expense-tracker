import ExpenseCard from "./ExpenseCard";
import Loader from "./Loader";

const ExpenseList = ({ expenses = [] }) => {

    // 🔹 LOADING STATE (fallback)
    if (!expenses) {
        return (
            <div className="space-y-3">
                <p className="text-sm  dark:text-gray-400" style={{ color: " var(--muted)" }}>
                    <Loader />;
                </p>
            </div >
        );
    }

    return (
        <div className="space-y-3">

            {/* 🔹 EMPTY STATE */}
            {expenses.length === 0 && (
                <div className="text-center py-10 border border-dashed rounded-2xl 
                    border-gray-300 dark:border-gray-700">

                    <p className=" dark:text-gray-400 text-sm">
                        No transactions yet
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        Start by adding your first expense 💸
                    </p>
                </div>
            )}

            {/* 🔹 LIST */}
            {
                expenses.map((expense, index) => (
                    <div
                        key={expense.id}
                        className="animate-fadeIn"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        <ExpenseCard expense={expense} />
                    </div>
                ))
            }
        </div >
    );
};

export default ExpenseList;