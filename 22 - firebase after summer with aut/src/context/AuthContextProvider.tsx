import { PropsWithChildren, createContext } from "react";

interface AuthContextType {}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
