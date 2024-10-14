import { Redirect, Stack } from "expo-router";

import { useAuth } from "../../context/AuthContext";

export default function AppLayout() {
	const { user } = useAuth();

	if (user === null) {
		return <Redirect href="/" />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
