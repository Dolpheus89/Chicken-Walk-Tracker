import { createContext, useState, useContext, ReactNode } from "react";

interface User {
	id: string;
	email: string;
	name: string;
	profile_image: string;
}

export interface AuthContextType {
	user: User | null;
	token: string | null;
	setUser: (user: User | null) => void;
	signIn: (token: string, userData: User) => void;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const signIn = (newToken: string, userData: User) => {
		setToken(newToken);
		setUser(userData);
	};

	const signOut = () => {
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, setUser, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
