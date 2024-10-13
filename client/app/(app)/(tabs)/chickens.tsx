import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Chickens() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Link href="/home">Go to Home</Link>
		</View>
	);
}
