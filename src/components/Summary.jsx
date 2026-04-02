export default function Summary({ totalExpense, totalCredit, balance }) {
    return (
        <div className="space-y-4">

            {/* 🔹 MAIN BALANCE CARD */}
            <div className="rounded-2xl p-5 
                bg-linear-to-br from-indigo-500 to-indigo-600 
                text-white shadow-md">

                <p className="text-sm opacity-80">Total Balance</p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                    ₹{balance}
                </h2>
            </div>

            {/* 🔹 EXPENSE + CREDIT */}
            <div className="grid grid-cols-2 gap-3">

                {/* EXPENSE */}
                <div className="rounded-2xl p-4 
                    bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800
                    shadow-sm hover:shadow-md transition-all">

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Expense
                    </p>

                    <p className="text-lg font-semibold text-red-500 mt-1">
                        - ₹{totalExpense}
                    </p>
                </div>

                {/* CREDIT */}
                <div className="rounded-2xl p-4 
                    bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800
                    shadow-sm hover:shadow-md transition-all">

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Credit
                    </p>

                    <p className="text-lg font-semibold text-green-500 mt-1">
                        + ₹{totalCredit}
                    </p>
                </div>

            </div>
        </div>
    );
}