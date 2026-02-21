import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { loginUser, registerUser, logoutUser } from "../firebase/auth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // 🔐 Auth persistence
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return unsub
    }, [])

    // 🔑 functions EXPECTED by Login.jsx
    const login = (email, password) => loginUser(email, password)
    const signup = (email, password) => registerUser(email, password)
    const logout = () => logoutUser()

    return (
        <AuthContext.Provider
            value={{ user, login, signup, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
    // console.log(loginUser, registerUser)
}

export const useAuth = () => useContext(AuthContext)