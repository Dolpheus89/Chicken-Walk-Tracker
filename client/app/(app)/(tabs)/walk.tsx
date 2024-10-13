import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Walk() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Link href="/chickens">Go to Chickens</Link>
		</View>
	);
}
