import { useState } from "react";

export default function AddExpense({ setExpenses }) {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const addExpense = () => {
        if (!text || !amount) return;

        setExpenses(prev => [
            {
                id: Date.now(),
                text,
                amount: Number(amount),
                image, // base64 screenshot
            },
            ...prev,
        ]);

        setText("");
        setAmount("");
        setImage(null);
    };

    return (
        <div className="card p-4 rounded mb-4">
            <input
                className="w-full p-2 mb-2 border rounded bg-transparent"
                placeholder="Description"
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <input
                type="number"
                className="w-full p-2 mb-2 border rounded bg-transparent"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />

            <input
                type="file"
                accept="image/*"
                className="w-full text-sm mb-3"
                onChange={handleImage}
            />

            <button
                onClick={addExpense}
                disabled={!text || !amount}
                className="w-full py-2 rounded disabled:opacity-50"
            >
                Add Expense
            </button>
        </div>
    );
}