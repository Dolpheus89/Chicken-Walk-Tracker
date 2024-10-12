import { View, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { styles } from "@/styles/auth";
import Button from "@/components/Button";
import LogIn from "@/components/LogIn";

export default function SignIn() {
	const { signIn } = useAuth();

	return (
		<View style={styles.globalContainer}>
			<Image
				source={require("../assets/images/default.png")}
				style={styles.logo}
			/>
			<View style={styles.bottomContainer}>
				<Button title="LOGIN" onPress={() => alert("coucou")} revert={true} />
				<Button
					title="REGISTER"
					onPress={() => alert("coucou")}
					revert={true}
				/>
				<LogIn />
			</View>
		</View>
	);
}
