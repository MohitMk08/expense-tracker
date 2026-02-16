export default function Summary({ total }) {
    return (
        <div className="card rounded p-4 mb-4 flex justify-between items-center">
            <span className="text-sm text-(--muted)">Total Spent</span>
            <span className="text-xl font-bold">₹{total}</span>
        </div>
    );
}