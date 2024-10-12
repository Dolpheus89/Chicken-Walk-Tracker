import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
	user: any;
	token: string | null;
	signIn: (token: string) => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loadToken = async () => {
			try {
				const storedToken = await SecureStore.getItemAsync("token");
				if (storedToken) {
					setToken(storedToken);
				}
			} catch (error) {
				console.error("Error loading token:", error);
			}
		};

		loadToken();
	}, []);

	const signIn = async (newToken: string) => {
		await SecureStore.setItemAsync("token", newToken);
		setToken(newToken);
	};

	const signOut = async () => {
		await SecureStore.deleteItemAsync("token");
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
