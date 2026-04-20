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

    const submit = async () => {
        try {
            setError("");
            setMessage("");

            isSignup
                ? await signup(email, password)
                : await login(email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReset = async () => {
        if (!email) {
            return setError("Enter email first");
        }

        try {
            await resetPassword(email);
            setMessage("Password reset email sent ✅");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

            {/* 🌈 Background */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-black"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="card space-y-6">

                    {/* TITLE */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">
                            {isSignup ? "Create Account" : "Welcome Back"}
                        </h2>
                    </div>

                    {/* ERROR / MESSAGE */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    {message && (
                        <p className="text-green-500 text-sm text-center">{message}</p>
                    )}

                    {/* FLOATING EMAIL */}
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input peer placeholder-transparent"
                            placeholder="Email"
                        />
                        <label className="absolute left-3 top-2 text-xs transition-all 
                            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
                            peer-placeholder-shown:text-gray-400
                            peer-focus:top-2 peer-focus:text-xs">
                            Email
                        </label>
                    </div>

                    {/* FLOATING PASSWORD */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input peer placeholder-transparent pr-10"
                            placeholder="Password"
                        />
                        <label className="absolute left-3 top-2 text-xs transition-all 
                            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
                            peer-placeholder-shown:text-gray-400
                            peer-focus:top-2 peer-focus:text-xs">
                            Password
                        </label>

                        {/* 👁️ Toggle */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-sm"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* FORGOT PASSWORD */}
                    {!isSignup && (
                        <p
                            onClick={handleReset}
                            className="text-xs text-right cursor-pointer text-blue-500"
                        >
                            Forgot Password?
                        </p>
                    )}

                    {/* BUTTON */}
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={submit}
                        className="btn btn-primary w-full"
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </motion.button>

                    {/* GOOGLE LOGIN */}
                    <button
                        onClick={handleGoogle}
                        className="w-full border py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        Continue with Google
                    </button>

                    {/* TOGGLE */}
                    <p
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-sm text-center cursor-pointer"
                        style={{ color: "var(--muted)" }}
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