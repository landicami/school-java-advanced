import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, User, UserCredential } from "firebase/auth";
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
	reloadUser: () => boolean
	setEmail: (email: string) => Promise<void>
	setDisplayName: (name: string) => Promise<void>
	setPassword: (password: string) => Promise<void>
	setPhotoUrl: (url: string) => Promise<void>
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

	const reloadUser = () => {
		if (!currentUser) {
			return false;
		}

		// Update our derived states with the latest user info
		setUserName(currentUser.displayName);
		setUserEmail(currentUser.email);
		setUserPhotoUrl(currentUser.photoURL);

		return true;
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + "/login",  // redirect the user to the login page after they've set a new password
		});
	}

	const setEmail = (email: string) => {
		if (!currentUser) {
			throw new Error("Can't update email if you're not logged in");
		}
		return updateEmail(currentUser, email);
	}

	const setPassword = (password: string) => {
		if (!currentUser) {
			throw new Error("Can't update password if you're not logged in");
		}
		return updatePassword(currentUser, password);
	}

	const setDisplayName = (name: string) => {
		if (!currentUser) {
			throw new Error("Can't update name if you're not logged in");
		}
		return updateProfile(currentUser, { displayName: name });
	}

	const setPhotoUrl = (url: string) => {
		if (!currentUser) {
			throw new Error("Can't update photo url if you're not logged in");
		}
		return updateProfile(currentUser, { photoURL: url });
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);

			if (user) {
				// User is logged in
				setUserEmail(user.email);
				setUserName(user.displayName);
				setUserPhotoUrl(user.photoURL);
			} else {
				// No user is logged in
				setUserEmail(null);
				setUserName(null);
				setUserPhotoUrl(null);
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
			reloadUser,
			resetPassword,
			setDisplayName,
			setEmail,
			setPassword,
			setPhotoUrl,
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
