import {
    addDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebaseConfig"

const expenseRef = collection(db, "expenses")

export const addExpense = async ({ uid, amount, description, image }) => {
    let imageUrl = ""

    if (image) {
        const imageRef = ref(
            storage,
            `expenses/${uid}/${Date.now()}-${image.name}`
        )
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
    }

    return addDoc(expenseRef, {
        uid,
        amount: Number(amount),
        description,
        imageUrl,
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

export const deleteExpense = (id) =>
    deleteDoc(doc(db, "expenses", id))