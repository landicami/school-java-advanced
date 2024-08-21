import {
	Auth,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	reload,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateCurrentUser,
	updateEmail,
	updatePassword,
	updateProfile,
	User,
	UserCredential,
} from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { auth } from "../services/firebase";

interface AuthContextType {
	// Here be functions for signing up, logging in etc.
	// It will also contain the currently authenticated user (if any)
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<UserCredential>;
	currentUser: User | null;
	// reloadUser: ?
	// resetPassword: ?
	setEmail: (email: string) => Promise<void>;
	setDisplayName: (displayName: string) => Promise<void>;
	setPassword: (password: string) => Promise<void>;
	setPhotoUrl: (photoURL: string) => Promise<void>;
	reloadUser: () => Promise<void>;
	userEmail: string | null;
	userName: string | null;
	userPhotoUrl: string | null;
}

// Create the context and set the initial/default values
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

	const usor = getAuth().currentUser;

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const reloadUser = async () => {
		if (currentUser) {
			reload(currentUser);
		}
	};

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + "/login", // redirect the user to the login page after they've set a new password
		});
	};

	const setEmail = async (email: string) => {
		if (usor) {
			await updateEmail(usor, email);
		} else {
			console.log("No user found");
		}
	};

	const setPassword = async (password: string) => {
		if (usor) {
			await updatePassword(usor, password);
		}
	};

	const setDisplayName = async (displayName: string) => {
		if (usor) {
			await updateProfile(usor, {
				displayName,
			});
		}
		setUserName(displayName);
	};

	const setPhotoUrl = async (photoURL: string) => {
		if (usor) {
			await updateProfile(usor, {
				photoURL,
			});
		}
		setUserPhotoUrl(photoURL);
	};

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
		console.log("trying to sign up");
	};

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
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				resetPassword,
				signup,
				setEmail,
				setPassword,
				setPhotoUrl,
				setDisplayName,
				reloadUser,
				userEmail,
				userName,
				userPhotoUrl,
			}}
		>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader color={"#888"} size={25} speedMultiplier={1.1} />
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
