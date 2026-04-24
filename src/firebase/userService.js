import { doc, updateDoc } from "firebase/firestore";
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