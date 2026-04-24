export default function Label({ children }) {
    return (
        <label
            className="text-xs mb-1 block"
            style={{ color: "var(--text-muted)" }}
        >
            {children}
        </label>
    );
}