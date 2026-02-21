import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addExpense } from "../firebase/expenseService";

export default function AddExpense() {
    const { user } = useAuth();

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async () => {
        if (!amount || !description) {
            setError("Amount and description are required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await addExpense({
                uid: user.uid,
                amount,
                description,
            });

            setAmount("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full max-w-xl mx-auto">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 sm:p-6 space-y-4">

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Add Expense
                </h3>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-2.5 transition"
                >
                    {loading ? "Adding..." : "Add Expense"}
                </button>
            </div>
        </section>
    );
}