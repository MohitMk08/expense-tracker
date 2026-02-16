import { useState } from "react"
import { registerUser } from "../firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await registerUser(email, password)
            navigate("/")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.form
                onSubmit={handleRegister}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account ✨
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-3 border rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    className="w-full mb-4 px-4 py-3 border rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium">
                        Login
                    </Link>
                </p>
            </motion.form>
        </div>
    )
}