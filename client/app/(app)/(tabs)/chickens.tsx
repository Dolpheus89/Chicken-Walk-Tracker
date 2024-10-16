import { Text, View, ScrollView, Image } from "react-native";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Chicken from "@/components/Chicken";
import { styles } from "@/styles/chickens";
import Button from "@/components/Button";
import { API_URL } from "@/variables";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";
import AddChicken from "@/components/AddChicken";

export type ChickenType = {
	id: number;
	user_id: number;
	name: string;
	age: number;
	breed: string;
	distance: number;
	chicken_image: string;
};

export default function Chickens() {
	const { user } = useContext(AuthContext) as AuthContextType;
	const [chickens, setChickens] = useState({
		data: [],
		loading: true,
	});

	const getChickens = async () => {
		if (!user?.id) return;

		try {
			const response = await axios.get(`${API_URL}/chickens/${user.id}`);
			setChickens({ data: response.data, loading: false });
		} catch (error) {
			setChickens({ data: [], loading: false });
			console.error("Erreur lors de la récupération des poulets :", error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getChickens();
	}, []);

	if (chickens.loading || chickens.data.length < 1) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Image
					source={require("@/assets/images/cuteChick.png")}
					style={{ height: 200, width: 200 }}
				/>
				<AddChicken getChickens={getChickens} />
			</View>
		);
	}

	return (
		<ScrollView>
			<View style={styles.allChicksHeader}>
				<Text style={styles.allChicksTitle}> Voici ton beau poulailler</Text>
				<AddChicken getChickens={getChickens} />
			</View>
			<View style={styles.allChicksContainer}>
				{chickens.data.map((chicken: ChickenType) => (
					<Chicken
						key={chicken.id}
						chicken={chicken}
						getChickens={getChickens}
					/>
				))}
			</View>
		</ScrollView>
	);
}
