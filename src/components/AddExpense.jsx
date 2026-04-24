import { useState, useRef, useMemo } from "react";
import { addExpense } from "../firebase/expenseService";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, Input, Toggle } from "../ui";

export default function AddExpense({ user, eventOptions = [] }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("expense");
    const [event, setEvent] = useState("general");
    const [imageBase64, setImageBase64] = useState(null);
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef(null);

    const safeEventOptions = useMemo(() => {
        if (!eventOptions) return [];
        if (Array.isArray(eventOptions)) return eventOptions;
        return Object.values(eventOptions);
    }, [eventOptions]);

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
        setDragActive(false);
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

            setSuccess(true);
            setTimeout(() => setSuccess(false), 1500);

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
            className="relative"
        >
            <Card className="space-y-6 overflow-hidden">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h2
                        className="text-lg font-semibold"
                        style={{ color: "var(--text)" }}
                    >
                        Add Transaction
                    </h2>

                    <span
                        className="text-xs px-2 py-1 rounded-full capitalize"
                        style={{
                            background:
                                type === "credit"
                                    ? "rgba(34,197,94,0.12)"
                                    : "rgba(239,68,68,0.12)",
                            color:
                                type === "credit"
                                    ? "var(--success)"
                                    : "var(--danger)",
                        }}
                    >
                        {type}
                    </span>
                </div>

                {/* SUCCESS OVERLAY */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-md z-20 rounded-2xl"
                            style={{ background: "rgba(0,0,0,0.15)" }}
                        >
                            <motion.div
                                initial={{ scale: 0.85 }}
                                animate={{ scale: 1 }}
                                className="px-6 py-3 rounded-xl font-medium"
                                style={{
                                    background: "var(--card)",
                                    boxShadow: "var(--shadow-md)",
                                    color: "var(--text)",
                                }}
                            >
                                ✅ Entry Added
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TOGGLE */}
                <Toggle value={type} onChange={setType} />

                {/* INPUTS */}
                <div className="grid gap-4">

                    <Input
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <Input
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* EVENT */}
                    <div className="space-y-1">
                        <label
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Event
                        </label>

                        <input
                            list="eventOptions"
                            value={event}
                            onChange={(e) => setEvent(e.target.value)}
                            placeholder="e.g. Trip, Marriage, Shopping"
                            className="w-full px-3 py-2 rounded-xl outline-none transition"
                            style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                color: "var(--text)",
                            }}
                            onFocus={(e) =>
                            (e.target.style.border =
                                "1px solid var(--primary)")
                            }
                            onBlur={(e) =>
                            (e.target.style.border =
                                "1px solid var(--border)")
                            }
                        />

                        <datalist id="eventOptions">
                            {safeEventOptions.map((ev, i) => (
                                <option key={i} value={ev} />
                            ))}
                        </datalist>
                    </div>
                </div>

                {/* DRAG & DROP */}
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onClick={() => fileInputRef.current.click()}
                    className="rounded-xl p-6 text-center cursor-pointer transition-all"
                    style={{
                        border: `2px dashed ${dragActive ? "var(--primary)" : "var(--border)"
                            }`,
                        background: dragActive
                            ? "rgba(99,102,241,0.08)"
                            : "var(--card-soft)",
                    }}
                >
                    <p
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                    >
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
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={imageBase64}
                        className="w-full h-44 object-cover rounded-xl"
                        style={{
                            border: "1px solid var(--border)",
                        }}
                    />
                )}

                {/* SUBMIT */}
                <Button type="submit" className="w-full">
                    Add Entry
                </Button>
            </Card>
        </motion.form>
    );
}