import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

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