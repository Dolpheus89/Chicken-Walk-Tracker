import { StyleSheet } from "react-native";

export const Colors = {
	primary: "#70bbff",
	secondary: "#FDFCFB",
	shadows: "#dbd1c7",
	red: "#ff4950",
	yellow: "#fccf4d",
};

export const styles = StyleSheet.create({
	button: {
		alignSelf: "center",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 20,
		minWidth: 250,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
	textInput: {
		height: 50,
		borderWidth: 1,
		borderColor: Colors.shadows,
		marginHorizontal: 20,
		marginVertical: 10,
		borderRadius: 25,
		paddingLeft: 10,
	},
});
