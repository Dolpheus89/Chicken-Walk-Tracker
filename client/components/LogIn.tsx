import { styles } from "@/styles/global";
import { View, TextInput } from "react-native";
import Button from "./Button";

export default function LogIn() {
	return (
		<View style={{ backgroundColor: "#fff" }}>
			<TextInput placeholder="Email" style={styles.textInput} />
			<TextInput placeholder="Full Name" style={styles.textInput} />
			<TextInput placeholder="Password" style={styles.textInput} />
			<View>
				<Button
					title="LOGIN"
					onPress={() => alert("coucou 2")}
					revert={false}
				/>
			</View>
		</View>
	);
}
