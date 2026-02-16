import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({ expenses, setExpenses }) {
    const deleteExpense = (id) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    if (!expenses.length)
        return (
            <p className="text-center text-(--muted)">
                No expenses yet
            </p>
        );

    return (
        <div className="space-y-3">
            {expenses.map(expense => (
                <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={deleteExpense}
                />
            ))}
        </div>
    );
}