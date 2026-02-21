import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToUserExpenses } from "../firebase/expenseService";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = () => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const unsubscribe = subscribeToUserExpenses(user.uid, (data) => {
            setExpenses(data);
            setLoading(false);
        });

        return () => unsubscribe(); // cleanup
    }, [user]);

    if (loading) return <p>Loading expenses...</p>;

    return (
        <div className="space-y-3">
            {expenses.length === 0 && <p>No expenses yet</p>}

            {expenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
            ))}
        </div>
    );
};

export default ExpenseList;