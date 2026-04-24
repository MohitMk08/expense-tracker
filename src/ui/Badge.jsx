export default function Badge({ children }) {
    return (
        <span
            className="px-2 py-1 rounded-full text-xs"
            style={{
                background: "var(--primary-soft)",
                color: "var(--primary)",
            }}
        >
            {children}
        </span>
    );
}