import { styles } from "@/styles/global";
import { View, TextInput } from "react-native";
import Button from "./Button";
import type { Credentials } from "./Register";
import { useState, useContext } from "react";
import { router } from "expo-router";
import axios from "axios";
import { API_URL } from "@/variables";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";

export default function LogIn() {
	const { signIn, setUser } = useContext(AuthContext) as AuthContextType;
	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
	});
	const handleSubmit = async () => {
		try {
			const response = await axios.post(`${API_URL}/users/login`, credentials);
			const { token, userData } = response.data;
			signIn(token, userData);
			setUser(userData);
			setCredentials({ password: "", email: "" });
			router.replace("/home");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const errorMessage =
					err.response?.data?.message ||
					"An unknown error occurred. Please try again later.";
				alert(`Login failed: ${errorMessage}`);
			} else {
				alert("Login failed: An unexpected error occurred.");
			}
		}
	};

	const handleInputChange = (field: keyof Credentials, value: string) => {
		setCredentials({ ...credentials, [field]: value });
	};
	return (
		<View style={{ paddingVertical: "15%", gap: 15 }}>
			<TextInput
				placeholder="Email"
				style={styles.textInput}
				placeholderTextColor={"#252525"}
				value={credentials.email}
				onChangeText={(value) => handleInputChange("email", value)}
				autoCapitalize="none"
				inputMode="email"
			/>
			<TextInput
				placeholder="Password"
				style={styles.textInput}
				placeholderTextColor={"#252525"}
				value={credentials.password}
				onChangeText={(value) => handleInputChange("password", value)}
				autoCapitalize="none"
				secureTextEntry
			/>
			<Button title="LOGIN" onPress={() => handleSubmit()} revert={false} />
		</View>
	);
}
