import { useState, useRef, useMemo } from "react";
import { addExpense } from "../firebase/expenseService";

export default function AddExpense({ user, eventOptions = [] }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("expense");
    const [event, setEvent] = useState("general");
    const [imageBase64, setImageBase64] = useState(null);

    const fileInputRef = useRef(null);

    // ✅ FIX: ensure eventOptions is ALWAYS array
    const safeEventOptions = useMemo(() => {
        if (!eventOptions) return [];

        // if already array
        if (Array.isArray(eventOptions)) return eventOptions;

        // if object (firebase case)
        return Object.values(eventOptions);
    }, [eventOptions]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!amount || !description) return;

        try {
            await addExpense({
                uid: user.uid,
                amount: Number(amount), // ✅ ensure number
                description,
                type,
                imageBase64,
                event: event.trim() || "general", // ✅ CLEAN EVENT
            });

            // reset
            setAmount("");
            setDescription("");
            setType("expense");
            setEvent("general");
            setImageBase64(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <form
            onSubmit={submit}
            className="bg-white dark:bg-gray-900 p-5 rounded-2xl 
            border border-gray-200 dark:border-gray-800 
            shadow-sm space-y-5 transition-all"
        >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Transaction
            </h2>

            {/* 🔹 TYPE TOGGLE */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex-1 py-2 text-sm font-medium transition-all ${type === "expense"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        }`}
                >
                    Expense
                </button>

                <button
                    type="button"
                    onClick={() => setType("credit")}
                    className={`flex-1 py-2 text-sm font-medium transition-all ${type === "credit"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        }`}
                >
                    Credit
                </button>
            </div>

            {/* 🔹 AMOUNT */}
            <div className="space-y-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                    Amount
                </label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border 
                    border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
            </div>

            {/* 🔹 DESCRIPTION */}
            <div className="space-y-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                    Description
                </label>
                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border 
                    border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
            </div>

            {/* 🔹 EVENT (Dynamic + Safe) */}
            <div className="space-y-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                    Event
                </label>

                <input
                    list="eventOptions"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    placeholder="Type or select event"
                    className="w-full px-3 py-2 rounded-xl border 
                    border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-white"
                />

                {/* ✅ SAFE MAP FIX */}
                <datalist id="eventOptions">
                    {safeEventOptions.map((ev, i) => (
                        <option key={i} value={ev} />
                    ))}
                </datalist>
            </div>

            {/* 🔹 FILE UPLOAD */}
            <div className="space-y-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                    Upload Receipt (optional)
                </label>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImage}
                    className="w-full text-sm file:mr-3 file:py-2 file:px-3 
                    file:rounded-lg file:border-0 
                    file:bg-indigo-50 file:text-indigo-600
                    hover:file:bg-indigo-100"
                />

                {imageBase64 && (
                    <img
                        src={imageBase64}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
                    />
                )}
            </div>

            {/* 🔹 SUBMIT */}
            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 
                text-white py-3 rounded-xl font-medium 
                transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
                Add Entry
            </button>
        </form>
    );
}