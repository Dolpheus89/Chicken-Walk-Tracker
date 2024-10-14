import { styles } from "@/styles/global";
import { View, TextInput } from "react-native";
import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import { API_URL } from "@/variables";

export interface Credentials {
	name?: string;
	email: string;
	password: string;
}

export default function Register() {
	const [credentials, setCredentials] = useState<Credentials>({
		name: "",
		email: "",
		password: "",
	});
	const handleSubmit = async () => {
		try {
			await axios.post(`${API_URL}/users/register`, credentials);
			setCredentials({ name: "", password: "", email: "" });
			alert("Registration successful!");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const errorMessage =
					err.response?.data?.message ||
					"An unknown error occurred. Please try again later.";
				alert(`Registration failed: ${errorMessage}`);
			} else {
				alert("Registration failed: An unexpected error occurred.");
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
			/>
			<TextInput
				placeholder="Full Name"
				style={styles.textInput}
				placeholderTextColor={"#252525"}
				value={credentials.name}
				onChangeText={(value) => handleInputChange("name", value)}
			/>
			<TextInput
				placeholder="Password"
				style={styles.textInput}
				placeholderTextColor={"#252525"}
				value={credentials.password}
				onChangeText={(value) => handleInputChange("password", value)}
			/>

			<Button title="REGISTER" onPress={() => handleSubmit()} revert={false} />
		</View>
	);
}
