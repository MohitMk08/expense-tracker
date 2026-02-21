import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, signup } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");

    const submit = async () => {
        try {
            setError("");
            isSignup
                ? await signup(email, password)
                : await login(email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card p-6 rounded w-full max-w-sm space-y-4">
                <h2 className="text-xl font-bold text-center">
                    {isSignup ? "Create Account" : "Login"}
                </h2>

                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <input
                    className="w-full p-2 border rounded bg-transparent"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-2 border rounded bg-transparent"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={submit}
                    className="w-full py-2 rounded"
                >
                    {isSignup ? "Sign Up" : "Login"}
                </button>

                <p
                    className="text-sm text-center cursor-pointer text-(--muted)"
                    onClick={() => setIsSignup(!isSignup)}
                >
                    {isSignup
                        ? "Already have an account? Login"
                        : "New user? Create account"}
                </p>
            </div>
        </div>
    );
}