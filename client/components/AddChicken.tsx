import {
	View,
	TextInput,
	Modal,
	Text,
	TouchableOpacity,
	Image,
} from "react-native";
import Button from "./Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "@/variables";
import { Colors } from "@/styles/global";
import { styles } from "@/styles/chickens";
import type { ChickenType } from "@/app/(app)/(tabs)/chickens";

export default function AddChicken() {
	const [openModal, setOpenModal] = useState(false);
	const [chickenImage, setChickenImage] = useState(
		`${API_URL}/images/default.jpg`,
	);
	const [newChicken, setNewChicken] = useState({
		name: "",
		age: 0,
		breed: "",
	});

	const uploadImage = async (): Promise<void> => {
		try {
			await ImagePicker.requestMediaLibraryPermissionsAsync();
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
			});

			if (!result.canceled) {
				setChickenImage(result.assets[0].uri);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(`Error uploading image: ${error.message}`);
			} else {
				alert("An unknown error occurred while uploading the image.");
			}
		}
	};

	const handleInputChange = (field: keyof ChickenType, value: string) => {
		setNewChicken({ ...newChicken, [field]: value });
	};

	return (
		<View>
			<Button
				title="Ajouter"
				revert={false}
				onPress={() => setOpenModal(true)}
			/>
			<Modal
				animationType="slide"
				transparent={true}
				visible={openModal}
				onRequestClose={() => {
					setOpenModal(false);
				}}
			>
				<View style={styles.addChickenContainer}>
					<View style={styles.closeButtonContainer}>
						<TouchableOpacity onPress={() => setOpenModal(false)}>
							<Text style={{ color: Colors.primary }}>X</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={uploadImage}>
						<Image
							source={{ uri: chickenImage }}
							resizeMode="cover"
							style={styles.addChickenImage}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder="Name"
						style={styles.addChickenTextInput}
						placeholderTextColor={"#252525"}
						value={newChicken.name}
						onChangeText={(value) => handleInputChange("name", value)}
						autoCapitalize="none"
						inputMode="text"
					/>
					<TextInput
						placeholder="Age"
						style={styles.addChickenTextInput}
						placeholderTextColor={"#252525"}
						value={newChicken.age ? String(newChicken.age) : ""}
						onChangeText={(value) =>
							handleInputChange("age", value.replace(/[^0-9]/g, ""))
						}
						inputMode="numeric"
					/>
					<TextInput
						placeholder="Breed"
						style={styles.addChickenTextInput}
						placeholderTextColor={"#252525"}
						value={newChicken.breed}
						onChangeText={(value) => handleInputChange("breed", value)}
						inputMode="text"
					/>

					<Button
						title="Ajouter"
						revert={false}
						onPress={() => alert("coucou")}
					/>
				</View>
			</Modal>
		</View>
	);
}
