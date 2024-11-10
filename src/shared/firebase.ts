// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKTh6WbrFw2sdAoQEkLk96if8PL3ces8o',
  authDomain: 'scholarite-bd3f2.firebaseapp.com',
  projectId: 'scholarite-bd3f2',
  storageBucket: 'scholarite-bd3f2.appspot.com',
  messagingSenderId: '638224226927',
  appId: '1:638224226927:web:7efef1b1917324007ccb9a'
}

let app: FirebaseApp
let db: Firestore

export const initFirebase = (): Firestore => {
  try {
    // Vérifier si l'app est déjà initialisée
    try {
      app = getApp()
    } catch {
      app = initializeApp(firebaseConfig)
    }

    // Initialiser Firestore si ce n'est pas déjà fait
    if (!db) {
      db = getFirestore(app)
    }

    return db
  } catch (e) {
    console.error("Erreur lors de l'initialisation de Firebase:", e)
    throw e
  }
}

// Exportez une fonction pour obtenir l'instance db
export const getDb = (): Firestore => {
  if (!db) {
    return initFirebase()
  }

  return db
}
