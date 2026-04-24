export default function Input({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label
                className="text-xs"
                style={{ color: "var(--text-muted)" }}
            >
                {label}
            </label>

            <input
                {...props}
                className="w-full px-3 py-2 rounded-xl outline-none transition"
                style={{
                    background: "var(--card-soft)",
                    border: "1px solid var(--border)",
                    color: "var(--text)"
                }}
            />
        </div>
    );
}