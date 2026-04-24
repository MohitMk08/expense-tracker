export default function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-2xl p-4 transition ${className}`}
            style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)"
            }}
        >
            {children}
        </div>
    );
}