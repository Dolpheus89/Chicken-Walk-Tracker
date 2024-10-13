import { StyleSheet } from "react-native";
import { Colors } from "./global";

export const styles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		justifyContent: "space-around",
	},
	formInputContainer: {
		marginBottom: 70,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		justifyContent: "center",
	},
	svgContainer: {
		position: "relative",
		backgroundColor: Colors.primary,
		paddingVertical: 40,
		flex: 1,
	},
	closeButtonContainer: {
		top: -20,
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 1,
		backgroundColor: Colors.secondary,
		borderRadius: 20,
	},
});
