import {
    addDoc,
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebaseConfig"

const expenseRef = collection(db, "expenses")

export const addExpense = async ({
    uid,
    amount,
    description,
    type, // 🆕
    imageBase64,
    event
}) => {
    return addDoc(collection(db, "expenses"), {
        uid,
        amount: Number(amount),
        description,
        type: type || "expense", // default
        imageBase64: imageBase64 || null,
        event: event || "general", // default
        createdAt: serverTimestamp(),
    });
};

/**
 * 🔥 REAL-TIME LISTENER
 */

export const subscribeToUserExpenses = (uid, callback) => {
    const q = query(
        collection(db, "expenses"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(expenses);
    });
};


export const deleteExpense = (id) =>
    deleteDoc(doc(db, "expenses", id))