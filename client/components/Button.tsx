import { styles } from "@/styles/global";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "@/styles/global";

type Props = {
	title: string;
	revert: boolean;
	onPress: () => void;
};

export default function Button({ title, onPress, revert }: Props) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: revert ? Colors.secondary : Colors.primary },
			]}
			onPress={onPress}
		>
			<Text
				selectable={false}
				style={[styles.buttonText, { color: revert ? "#252525" : "#fff" }]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
