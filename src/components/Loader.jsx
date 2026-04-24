import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
    return (
        <div
            className="flex justify-center items-center py-10"
            style={{ background: "var(--bg)" }}
        >
            <CirclesWithBar
                height="100"
                width="100"
                color="var(--primary)"
                outerCircleColor="var(--primary)"
                innerCircleColor="var(--primary)"
                barColor="var(--primary)"
                ariaLabel="loading"
                visible={true}
            />
        </div>
    );
}