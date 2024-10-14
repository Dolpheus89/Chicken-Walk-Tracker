import { useContext, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { styles } from "@/styles/home";
import Button from "@/components/Button";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { API_URL } from "@/variables";

export default function Home() {
	const { signOut, user } = useContext(AuthContext) as AuthContextType;
	const [profileImage, setProfileImage] = useState(
		`${API_URL}${user?.profile_image}`,
	);

	const pickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		console.log("Media Library Permission:", permissionResult);

		if (!permissionResult.granted) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (!result.canceled) {
			const localUri = result.assets[0].uri;
			const mimeType = result.assets[0].mimeType;

			if (mimeType && !isValidImage(mimeType)) {
				alert("Please select a valid image format (JPEG, PNG, GIF).");
				return;
			}

			try {
				const response = await fetch(localUri);
				if (!response.ok) {
					throw new Error("Failed to fetch image");
				}

				const blob = await response.blob();
				const formData = new FormData();
				formData.append("profile_image", blob, "profile-image.jpg");

				const uploadResponse = await axios.put(
					`${API_URL}/users/update/${user?.id}`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
						timeout: 10000,
					},
				);

				setProfileImage(`${API_URL}${uploadResponse.data.profile_image}`);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error(
						"Error uploading the image:",
						error.response?.data || error.message,
					);
				} else {
					console.error("Unexpected error:", error);
				}
			}
		} else {
			alert("You did not select any image.");
		}
	};

	const isValidImage = (mimeType: string): boolean => {
		const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
		return allowedTypes.includes(mimeType);
	};

	return (
		<View style={styles.homeContainer}>
			<TouchableOpacity style={styles.imgContainer} onPress={pickImage}>
				<Image
					source={{ uri: profileImage }}
					style={styles.imgProfile}
					resizeMode="cover"
				/>
				<Text style={styles.imgText}>Bienvenue {user?.name} !</Text>
			</TouchableOpacity>
			<Button title="LOGOUT" revert={true} onPress={() => signOut()} />
		</View>
	);
}
