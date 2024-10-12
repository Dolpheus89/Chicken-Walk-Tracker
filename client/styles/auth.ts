import { StyleSheet } from "react-native";
import { Colors } from "./global";

export const styles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		justifyContent: "space-around",
		backgroundColor: Colors.primary,
		fontFamily: "Arial",
	},
	bottomContainer: {
		justifyContent: "center",
		gap: 20,
	},
	logo: {
		alignSelf: "center",
		height: 200,
		width: 200,
	},
	button: {
		backgroundColor: Colors.secondary,
		alignSelf: "center",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 20,
		minWidth: 150,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 16,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
});
