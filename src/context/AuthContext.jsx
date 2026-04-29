import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { loginUser, registerUser, logoutUser } from "../firebase/auth";

// ✅ NEW IMPORT
import { createUserIfNotExists } from "../firebase/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔐 Auth persistence + 🔥 STORE USER
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            // new user console
            console.log("Checking user in Firestore:", currentUser?.email);

            // ✅ ADD THIS LOGIC
            if (currentUser) {
                try {
                    await createUserIfNotExists(currentUser);
                } catch (err) {
                    console.error("User store failed:", err);
                }
            }

            setLoading(false);
        });

        return unsub;
    }, []);

    // 🔑 functions EXPECTED by Login.jsx
    const login = (email, password) => loginUser(email, password);
    const signup = (email, password) => registerUser(email, password);
    const logout = () => logoutUser();

    return (
        <AuthContext.Provider
            value={{ user, login, signup, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);