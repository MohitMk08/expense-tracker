import { doc, updateDoc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateCurrency = async (uid, currency) => {
    try {
        await updateDoc(doc(db, "users", uid), {
            currency,
        });
    } catch (err) {
        console.error("Currency update error:", err);
    }
};

export const createUserIfNotExists = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            createdAt: serverTimestamp(),
        });
    }
};