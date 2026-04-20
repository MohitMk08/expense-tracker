import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

export const googleLogin = () => signInWithPopup(auth, provider);

export const resetPassword = (email) =>
    sendPasswordResetEmail(auth, email);

// SIGN UP
export function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// LOGIN
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export function logoutUser() {
    return signOut(auth);
}


