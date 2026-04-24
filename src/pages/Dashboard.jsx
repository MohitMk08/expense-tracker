import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import AddExpense from "../components/AddExpense";
import ExpenseCard from "../components/ExpenseCard";
import { logoutUser } from "../firebase/auth";
import { Card, Button } from "../ui";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "expenses"),
            where("uid", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setExpenses(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const totalExpense = expenses
        .filter((e) => (e.type || "expense") === "expense")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalCredit = expenses
        .filter((e) => e.type === "credit")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const balance = totalCredit - totalExpense;

    const total = totalExpense;

    if (!user) {
        return (
            <p className="text-center mt-10" style={{ color: "var(--text-muted)" }}>
                Loading user...
            </p>
        );
    }

    return (
        <div className="min-h-screen px-4 py-6 max-w-3xl mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1
                    className="text-xl md:text-2xl font-bold"
                    style={{ color: "var(--text)" }}
                >
                    Expense Tracker
                </h1>

                <Button variant="danger" onClick={logoutUser}>
                    Logout
                </Button>
            </div>

            {/* TOTAL CARD */}
            <Card>
                <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                >
                    Total Spent
                </p>

                <h2
                    className="text-2xl font-bold mt-1"
                    style={{ color: "var(--text)" }}
                >
                    ₹ {total}
                </h2>
            </Card>

            {/* SUMMARY GRID */}
            <div className="grid grid-cols-3 gap-3 mt-4">

                <Card>
                    <p style={{ color: "var(--text-muted)" }}>Expense</p>
                    <p style={{ color: "var(--danger)" }}>
                        ₹{totalExpense}
                    </p>
                </Card>

                <Card>
                    <p style={{ color: "var(--text-muted)" }}>Credit</p>
                    <p style={{ color: "var(--success)" }}>
                        ₹{totalCredit}
                    </p>
                </Card>

                <Card>
                    <p style={{ color: "var(--text-muted)" }}>Balance</p>
                    <p style={{ color: "var(--primary)" }}>
                        ₹{balance}
                    </p>
                </Card>
            </div>

            {/* ADD EXPENSE */}
            <div className="mt-6">
                <AddExpense user={user} />
            </div>

            {/* LIST */}
            <div className="mt-6">
                {loading ? (
                    <p
                        className="text-center"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Loading expenses…
                    </p>
                ) : expenses.length === 0 ? (
                    <Card className="text-center">
                        <p style={{ color: "var(--text-muted)" }}>
                            No expenses yet
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {expenses.map((expense) => (
                            <ExpenseCard key={expense.id} expense={expense} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}