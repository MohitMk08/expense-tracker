import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { googleLogin, resetPassword } from "../firebase/auth";
import { motion } from "framer-motion";

export default function Login() {
    const { login, signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        try {
            setError("");
            setMessage("");
            setLoading(true);

            isSignup
                ? await signup(email, password)
                : await login(email, password);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            setLoading(true);
            await googleLogin();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        if (!email) return setError("Enter email first");

        try {
            await resetPassword(email);
            setMessage("Password reset email sent ✅");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

            {/* 🌈 PREMIUM BACKGROUND */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute w-125 h-125 bg-indigo-500/20 blur-3xl rounded-full -top-25 -bg-conic-30left-25" />
                <div className="absolute w-100 h-100 bg-purple-500/20 blur-3xl rounded-full -bottom-25 -right-25" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div
                    className="p-6 rounded-2xl space-y-6 backdrop-blur-xl"
                    style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow)",
                    }}
                >

                    {/* 🔥 TITLE */}
                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-semibold">
                            {isSignup ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Manage your expenses smarter
                        </p>
                    </div>

                    {/* ❗ ERROR / MESSAGE */}
                    {error && (
                        <p className="text-sm text-red-500 text-center">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className="text-sm text-green-500 text-center">
                            {message}
                        </p>
                    )}

                    {/* 📧 EMAIL */}
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 rounded-xl outline-none peer"
                            placeholder=" "
                            style={{
                                background: "var(--card-soft)",
                                border: "1px solid var(--border)",
                                color: "var(--text)",
                            }}
                        />
                        <label
                            className="absolute left-3 text-xs transition-all
                            peer-placeholder-shown:top-3.5 
                            peer-placeholder-shown:text-sm
                            peer-focus:top-1 
                            peer-focus:text-xs"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Email
                        </label>
                    </div>

                    {/* 🔒 PASSWORD */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-3 rounded-xl outline-none peer pr-10"
                            placeholder=" "
                            style={{
                                background: "var(--card-soft)",
                                border: "1px solid var(--border)",
                                color: "var(--text)",
                            }}
                        />
                        <label
                            className="absolute left-3 text-xs transition-all
                            peer-placeholder-shown:top-3.5 
                            peer-placeholder-shown:text-sm
                            peer-focus:top-1 
                            peer-focus:text-xs"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Password
                        </label>

                        {/* 👁️ TOGGLE */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-sm"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* 🔁 FORGOT */}
                    {!isSignup && (
                        <p
                            onClick={handleReset}
                            className="text-xs text-right cursor-pointer hover:underline"
                            style={{ color: "var(--primary)" }}
                        >
                            Forgot Password?
                        </p>
                    )}

                    {/* 🚀 BUTTON */}
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={submit}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-medium transition"
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading
                            ? "Processing..."
                            : isSignup
                                ? "Sign Up"
                                : "Login"}
                    </motion.button>

                    {/* 🔥 GOOGLE */}
                    <button
                        onClick={handleGoogle}
                        className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition"
                        style={{
                            background: "var(--card-soft)",
                            border: "1px solid var(--border)",
                        }}
                    >
                        <span>🔵</span>
                        Continue with Google
                    </button>

                    {/* 🔁 SWITCH */}
                    <p
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-sm text-center cursor-pointer hover:underline"
                        style={{ color: "var(--text-muted)" }}
                    >
                        {isSignup
                            ? "Already have an account? Login"
                            : "New user? Create account"}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}