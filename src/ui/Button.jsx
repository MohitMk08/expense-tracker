export default function Button({ children, variant = "primary", ...props }) {
    const styles = {
        primary: {
            background: "var(--primary)",
            color: "#fff",
            boxShadow: "0 6px 20px rgba(99,102,241,0.3)"
        },
        danger: {
            background: "var(--danger)",
            color: "#fff"
        },
        ghost: {
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text)"
        }
    };

    return (
        <button
            {...props}
            className="px-4 py-2 rounded-xl text-sm font-medium transition active:scale-95"
            style={styles[variant]}
        >
            {children}
        </button>
    );
}