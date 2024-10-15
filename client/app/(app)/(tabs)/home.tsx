import { useContext, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { styles } from "@/styles/home";
import Button from "@/components/Button";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";
import { API_URL } from "@/variables";

interface Asset {
	uri: string;
	type?: string;
	mime?: string;
}

export default function Home() {
	const { signOut, user } = useContext(AuthContext) as AuthContextType;
	const [profileImage, setProfileImage] = useState<string>(
		`${API_URL}${user?.profile_image}`,
	);
	const FormData = global.FormData;

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
				await saveImage(result.assets[0]);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(`Error uploading image: ${error.message}`);
			} else {
				alert("An unknown error occurred while uploading the image.");
			}
		}
	};

	const saveImage = async (asset: Asset): Promise<void> => {
		setProfileImage(asset.uri);
		await sendToBackend(asset.uri, asset.mime);
	};

	const sendToBackend = async (
		imageUri: string,
		mimeType?: string,
	): Promise<void> => {
		try {
			const formData = new FormData();
			const fileName = imageUri.split("/").pop() || "profile_image.png";
			const fileData: { uri: string; type: string; name: string } = {
				uri: imageUri,
				type: mimeType || "image/png",
				name: fileName,
			};

			formData.append("profile_image", fileData as unknown as Blob);

			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			await axios.put(`${API_URL}/users/update/${user?.id}`, formData, config);
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	return (
		<View style={styles.homeContainer}>
			<View>
				<TouchableOpacity style={styles.imgContainer} onPress={uploadImage}>
					<Image
						source={{ uri: profileImage }}
						style={styles.imgProfile}
						resizeMode="cover"
					/>
				</TouchableOpacity>
				<Text style={styles.imgText}>Bienvenue {user?.name} !</Text>
			</View>
			<View>
				<Text style={styles.imgText}>Vous avez parcouru un total de</Text>
				<Text style={styles.imgText}>0 km</Text>
			</View>
			<Button title="LOGOUT" revert={true} onPress={signOut} />
		</View>
	);
}
