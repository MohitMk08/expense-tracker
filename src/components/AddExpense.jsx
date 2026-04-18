import { useState, useRef, useMemo } from "react";
import { addExpense } from "../firebase/expenseService";
import { motion, AnimatePresence } from "framer-motion";

export default function AddExpense({ user, eventOptions = [] }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("expense");
    const [event, setEvent] = useState("general");
    const [imageBase64, setImageBase64] = useState(null);
    const [success, setSuccess] = useState(false);

    const fileInputRef = useRef(null);

    const safeEventOptions = useMemo(() => {
        if (!eventOptions) return [];
        if (Array.isArray(eventOptions)) return eventOptions;
        return Object.values(eventOptions);
    }, [eventOptions]);

    // 📂 Drag & Drop + File Upload
    const handleFile = (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!amount || !description) return;

        try {
            await addExpense({
                uid: user.uid,
                amount: Number(amount),
                description,
                type,
                imageBase64,
                event: event.trim() || "general",
            });

            // 🎉 success animation trigger
            setSuccess(true);

            setTimeout(() => setSuccess(false), 1500);

            // reset
            setAmount("");
            setDescription("");
            setType("expense");
            setEvent("general");
            setImageBase64(null);

            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card space-y-5 relative overflow-hidden"
        >
            <h2 className="text-lg font-semibold">Add Transaction</h2>

            {/* 🎉 SUCCESS ANIMATION */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/70 backdrop-blur rounded-2xl z-10"
                    >
                        <motion.div
                            initial={{ y: 10 }}
                            animate={{ y: 0 }}
                            className="text-green-500 text-xl font-semibold"
                        >
                            ✅ Added!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TYPE */}
            <div className="flex rounded-xl overflow-hidden border">
                <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex-1 py-2 transition ${type === "expense"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                        }`}
                >
                    Expense
                </button>

                <button
                    type="button"
                    onClick={() => setType("credit")}
                    className={`flex-1 py-2 transition ${type === "credit"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                        }`}
                >
                    Credit
                </button>
            </div>

            {/* AMOUNT */}
            <div>
                <label style={{ color: "var(--muted)" }} className="text-xs">
                    Amount
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input mt-1"
                />
            </div>

            {/* DESCRIPTION */}
            <div>
                <label style={{ color: "var(--muted)" }} className="text-xs">
                    Description
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input mt-1"
                />
            </div>

            {/* EVENT */}
            <div>
                <label style={{ color: "var(--muted)" }} className="text-xs">
                    Event
                </label>

                <input
                    list="eventOptions"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    className="input mt-1"
                />

                <datalist id="eventOptions">
                    {safeEventOptions.map((ev, i) => (
                        <option key={i} value={ev} />
                    ))}
                </datalist>
            </div>

            {/* 📂 DRAG DROP FILE UPLOAD */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-indigo-500 transition"
                onClick={() => fileInputRef.current.click()}
            >
                <p className="text-sm text-gray-500">
                    Drag & drop receipt or click to upload
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={(e) => handleFile(e.target.files[0])}
                />
            </div>

            {/* IMAGE PREVIEW */}
            {imageBase64 && (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={imageBase64}
                    className="w-full h-40 object-cover rounded-xl"
                />
            )}

            {/* SUBMIT */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-full"
                type="submit"
            >
                Add Entry
            </motion.button>
        </motion.form>
    );
}