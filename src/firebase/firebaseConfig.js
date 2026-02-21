import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZYqfCR0X5QEdpBf1KY-4z8d73gcgY_jU",
    authDomain: "expensetracker-a9ea8.firebaseapp.com",
    projectId: "expensetracker-a9ea8",
    storageBucket: "expensetracker-a9ea8.firebasestorage.app",
    messagingSenderId: "996580503871",
    appId: "1:996580503871:web:596f5b5797fd1bd1bb238a"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
