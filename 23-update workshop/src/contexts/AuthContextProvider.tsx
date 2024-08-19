import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { auth } from "../services/firebase";

interface AuthContextType {
	// Here be functions for signing up, logging in etc.
	// It will also contain the currently authenticated user (if any)
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential>
	currentUser: User | null
	// reloadUser: ?
	// resetPassword: ?
	// setEmail: ?
	// setDisplayName: ?
	// setPassword: ?
	// setPhotoUrl: ?
	userEmail: string | null
	userName: string | null
	userPhotoUrl: string | null
}

// Create the context and set the initial/default values
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	}

	const logout = () => {
		return signOut(auth);
	}

	const reloadUser = async () => {
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + "/login",  // redirect the user to the login page after they've set a new password
		});
	}

	const setEmail = (email: string) => {
	}

	const setPassword = (password: string) => {
	}

	const setDisplayName = (name: string) => {
	}

	const setPhotoUrl = (name: string) => {
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log("AuthStateChanged:", user);
			setCurrentUser(user);

			if (user) {
				// User is logged in
				setUserEmail(user.email);
			} else {
				// No user is logged in
				setUserEmail(null);
			}

			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			resetPassword,
			signup,
			userEmail,
			userName,
			userPhotoUrl,
		}}>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader color={"#888"} size={25} speedMultiplier={1.1} />
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
