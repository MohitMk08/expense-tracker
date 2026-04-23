// export default function Summary({ totalExpense, totalCredit, balance }) {
//     return (

//         <div className="grid grid-cols-3 gap-3">

//             <div className="card">
//                 <p style={{ color: "var(--muted)" }} className="text-xs">Expense</p>
//                 <p className="text-lg font-bold text-red-500">
//                     Rs. {totalExpense}
//                 </p>
//             </div>

//             <div className="card">
//                 <p style={{ color: "var(--muted)" }} className="text-xs">Credit</p>
//                 <p className="text-lg font-bold text-green-500">
//                     Rs. {totalCredit}
//                 </p>
//             </div>

//             <div className="card">
//                 <p style={{ color: "var(--muted)" }} className="text-xs">Balance</p>
//                 <p className="text-lg font-bold text-indigo-500">
//                     Rs. {balance}
//                 </p>
//             </div>

//         </div>
//     );
// }

export default function Summary({ totalExpense, totalCredit, balance }) {
    return (
        <div className="grid grid-cols-3 gap-3 mb-4">

            {/* EXPENSE */}
            <div className="p-3 rounded-xl border 
                bg-red-50 dark:bg-red-900/30
                border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-300">
                    Expense
                </p>
                <p className="font-semibold text-red-700 dark:text-red-200">
                    ₹{totalExpense}
                </p>
            </div>

            {/* CREDIT */}
            <div className="p-3 rounded-xl border 
                bg-green-50 dark:bg-green-900/30
                border-green-200 dark:border-green-800">
                <p className="text-xs text-green-600 dark:text-green-300">
                    Credit
                </p>
                <p className="font-semibold text-green-700 dark:text-green-200">
                    ₹{totalCredit}
                </p>
            </div>

            {/* BALANCE */}
            <div className="p-3 rounded-xl border 
                bg-indigo-50 dark:bg-indigo-900/30
                border-indigo-200 dark:border-indigo-800">
                <p className="text-xs text-indigo-600 dark:text-indigo-300">
                    Balance
                </p>
                <p className="font-semibold text-indigo-700 dark:text-indigo-200">
                    ₹{balance}
                </p>
            </div>

        </div>
    );
}