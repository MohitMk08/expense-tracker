export default function ExpenseCard({ expense, onDelete }) {
    return (
        <div className="card p-3 rounded space-y-2">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium">{expense.text}</p>
                    <p className="text-sm text-(--muted)">
                        ₹{expense.amount}
                    </p>
                </div>

                <button
                    onClick={() => onDelete(expense.id)}
                    className="delete-btn text-sm"
                >
                    Delete
                </button>
            </div>

            {expense.image && (
                <img
                    src={expense.image}
                    alt="Payment proof"
                    className="expense-img"
                />
            )}
        </div>
    );
}