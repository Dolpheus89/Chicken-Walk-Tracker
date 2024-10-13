import { Tabs } from "expo-router";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home-sharp" : "home-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="chickens"
				options={{
					title: "Chickens",
					tabBarIcon: ({ color, focused }) => (
						<Image
							source={
								focused
									? require("@/assets/icons/chicken24.png")
									: require("@/assets/icons/chicken24dark.png")
							}
							style={{ width: 24, height: 24 }}
							resizeMode="contain"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="walk"
				options={{
					title: "Walk",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "walk" : "walk-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
