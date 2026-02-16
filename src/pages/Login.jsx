import { useState } from "react"
import { loginUser } from "../firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await loginUser(email, password)
            navigate("/")
        } catch (err) {
            setError("Invalid credentials")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.form
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Welcome Back 👋
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-medium">
                        Register
                    </Link>
                </p>
            </motion.form>
        </div>
    )
}