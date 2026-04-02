import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { db } from "../firebase/firebaseConfig"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import AddExpense from "../components/AddExpense"
import ExpenseCard from "../components/ExpenseCard"
import ThemeToggle from "../components/ThemeToggle"
import { logoutUser } from "../firebase/auth"

export default function Dashboard() {
    const { user } = useContext(AuthContext)
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const q = query(
            collection(db, "expenses"),
            where("uid", "==", user.uid),
            orderBy("createdAt", "desc")
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setExpenses(data)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    const totalExpense = expenses
        .filter((e) => (e.type || "expense") === "expense")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalCredit = expenses
        .filter((e) => e.type === "credit")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const balance = totalCredit - totalExpense;

    // const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    if (!user) {
        return <p className="text-center mt-10">Loading user...</p>
    }

    return (
        <div className="min-h-screen px-4 py-6 max-w-3xl mx-auto text-gray-900 dark:text-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold">
                    Expense Tracker
                </h1>

                <div className="flex gap-2">
                    {/* <ThemeToggle /> */}
                    <button
                        onClick={logoutUser}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Total */}
            <div className="mb-6 p-4 rounded-2xl bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-800">
                <p className="text-sm opacity-70">Total Spent</p>
                <h2 className="text-2xl font-bold">₹ {total}</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900">
                    <p className="text-xs">Expense</p>
                    <p className="font-semibold">₹{totalExpense}</p>
                </div>

                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900">
                    <p className="text-xs">Credit</p>
                    <p className="font-semibold">₹{totalCredit}</p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900">
                    <p className="text-xs">Balance</p>
                    <p className="font-semibold">₹{balance}</p>
                </div>
            </div>

            <AddExpense />

            {/* List */}
            {loading ? (
                <p className="text-center opacity-70">Loading expenses…</p>
            ) : expenses.length === 0 ? (
                <p className="text-center opacity-70">No expenses yet</p>
            ) : (
                <div className="space-y-3">
                    {expenses.map((expense) => (
                        <ExpenseCard key={expense.id} expense={expense} />
                    ))}
                </div>
            )}
        </div>
    )
}