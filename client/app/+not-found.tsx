import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops! Not Found" }} />
			<View>
				<Text>Go back to Home screen!</Text>
			</View>
		</>
	);
}
