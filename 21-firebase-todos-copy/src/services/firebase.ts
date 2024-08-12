// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { CollectionReference, DocumentData, collection, getFirestore } from "firebase/firestore";
import { Todo } from "../types/Todo.types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const databas = getFirestore(app);

//default typ om vi inte skickar in något blir T documentData
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(databas, collectionName) as CollectionReference<T>;

}

// Our collection references
export const todosCol = createCollection<Todo>("todos");
//            ^?
export const lolcatsCol = createCollection("lolcats");
//            ^?

export default app;

