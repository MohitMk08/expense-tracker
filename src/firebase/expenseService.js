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

export const addExpense = async ({ uid, amount, description, imageBase64 }) => {
    return addDoc(expenseRef, {
        uid,
        amount: Number(amount),
        description,
        imageBase64: imageBase64 || null,
        createdAt: serverTimestamp(),
    })
}

export const getUserExpenses = async (uid) => {
    const q = query(
        expenseRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
}

/**
 * 🔥 REAL-TIME LISTENER
 */
export const subscribeToUserExpenses = (uid, callback) => {
    const q = query(
        expenseRef,
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