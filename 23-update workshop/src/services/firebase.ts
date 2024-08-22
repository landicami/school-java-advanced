import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { CollectionReference, DocumentData, collection, getFirestore } from "firebase/firestore";
import { NewTodo, Todo } from "../types/Todo.types";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth Instance
export const auth = getAuth(app);

// Get Firestore Instance
export const db = getFirestore(app);

//get storage
export const storage = getStorage(app);

// Helper to add type to collection references
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>;
};

// Our collection references
export const todosCol = createCollection<Todo>("todos");
export const newTodosCol = createCollection<NewTodo>("todos");

export default app;
