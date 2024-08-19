import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

interface AuthContextType {
	signUp: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	signOutUser: () => Promise<void>;
	forgotPswdUser: (email: string) => Promise<void>;
	isLoading: boolean;
	currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoading, setisLoading] = useState(true);
	console.log("Loading state is", isLoading);

	const signUp = (email: string, password: string) => {
		console.log("Hello, would sign up user from AuthContext", email, password);

		return createUserWithEmailAndPassword(auth, email, password);
	};
	// const signUp = async (auth: Auth, email: string, password: string) => {
	// 	try {
	// 		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	// 		const user = userCredential.user;
	// 		console.log(user);
	// 		toast.success("Success in signing up user");
	// 		return true;
	// 	} catch (err) {
	// 		if (err instanceof Error) {
	// 			toast.error(`There was something wrong with the sign-up, ${err.message}`);
	// 		} else {
	// 			console.log(err);
	// 		}
	// 		return false;
	// 	}
	// };

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = async () => {
		await signOut(auth);
	};

	const forgotPswdUser = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + "/login",
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user ? { ...user } : null); // maybe fix firebase not returning a new user when updating a user's information
			setisLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ signUp, login, currentUser, isLoading, signOutUser, forgotPswdUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
