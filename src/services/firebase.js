import { initializeApp } from "firebase/app"
import { getFirestore, serverTimestamp } from "firebase/firestore"
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA1PysCObHJ7CCiUTxYJdyF-1vcnNg9QC0",
    authDomain: "linkedin-clone-e9ca4.firebaseapp.com",
    projectId: "linkedin-clone-e9ca4",
    storageBucket: "linkedin-clone-e9ca4.appspot.com",
    messagingSenderId: "31406986411",
    appId: "1:31406986411:web:b69edfa0953318852293ee",
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

function getServerTimestamp() {
    return serverTimestamp()
}

export {
    db,
    auth,
    getServerTimestamp,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
}
