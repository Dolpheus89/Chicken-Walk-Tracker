import { StyleSheet } from "react-native";
import { Colors } from "./global";

export const styles = StyleSheet.create({
	homeContainer: {
		backgroundColor: Colors.primary,
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
	},
	imgProfile: {
		height: 150,
		width: 150,
		borderColor: Colors.secondary,
		borderWidth: 3,
		borderRadius: 100,
	},
	imgContainer: {
		alignItems: "center",
		gap: 20,
	},
	imgText: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "600",
		color: Colors.secondary,
		margin: 10,
	},
});
