import type { ChickenType } from "@/app/(app)/(tabs)/chickens";
import { styles } from "@/styles/chickens";
import { Colors } from "@/styles/global";
import { API_URL } from "@/variables";
import axios from "axios";
import { View, Text, Image, TouchableOpacity } from "react-native";

type ChickenProps = {
	chicken: ChickenType;
	getChickens: () => void;
};

export default function Chicken({ chicken, getChickens }: ChickenProps) {
	const handleDelete = async () => {
		try {
			await axios.delete(`${API_URL}/chickens/delete/${chicken.id}`);
			getChickens();
		} catch (error) {
			console.error("Erreur lors de la suppression du poulet :", error);
		}
	};

	return (
		<View style={styles.chickenContainer}>
			<Text style={styles.chickenText}>{chicken.name}</Text>
			<Text style={styles.chickenText}>{chicken.age} mois</Text>
			<Text style={styles.chickenText}>{chicken.breed}</Text>
			<Text style={styles.chickenText}>{chicken.distance} km</Text>
			<View style={styles.chickenImageContainer}>
				<Image
					source={{ uri: `${API_URL}${chicken.chicken_image}` }}
					resizeMode="contain"
					style={styles.chickenImage}
				/>
			</View>
			<View style={styles.closeButtonContainer}>
				<TouchableOpacity onPress={handleDelete}>
					<Text style={{ color: Colors.secondary }}>X</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
