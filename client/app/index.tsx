import {
	View,
	Dimensions,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useState, startTransition } from "react";
import { styles } from "@/styles/auth";
import Button from "@/components/Button";
import LogIn from "@/components/LogIn";
import Svg, { Image } from "react-native-svg";
import { Colors } from "@/styles/global";
import { useAnimatedStyles } from "@/components/animations/animatedStyles";
import Animated from "react-native-reanimated";
import Register from "@/components/Register";

export default function SignIn() {
	const [isRegistering, setIsRegistering] = useState(false);

	const {
		imagePosition,
		imageAnimatedStyle,
		closeAnimatedStyle,
		buttonsAnimatedStyle,
		formAnimatedStyle,
	} = useAnimatedStyles();

	const loginHandler = () => {
		startTransition(() => {
			imagePosition.value = 0;
			setIsRegistering(false);
		});
	};

	const registerHandler = () => {
		startTransition(() => {
			imagePosition.value = 0;
			setIsRegistering(true);
		});
	};

	return (
		<View style={styles.globalContainer}>
			<Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
				<Svg
					style={styles.svgContainer}
					height={Dimensions.get("window").height + 40}
					width={Dimensions.get("window").width}
				>
					<Image
						href={require("@/assets/images/default.png")}
						width={Dimensions.get("window").width}
						height={Dimensions.get("window").height - 200}
						preserveAspectRatio="xMidYMid meet"
					/>
				</Svg>
				<Animated.View
					style={[styles.closeButtonContainer, closeAnimatedStyle]}
				>
					<TouchableOpacity onPress={() => (imagePosition.value = 1)}>
						<Text style={{ fontSize: 24, color: Colors.red }}>X</Text>
					</TouchableOpacity>
				</Animated.View>
			</Animated.View>
			<Animated.View
				style={[
					buttonsAnimatedStyle,
					{ alignItems: "flex-end", gap: 20, marginTop: "100%" },
				]}
			>
				<Button title="LOGIN" onPress={loginHandler} revert={true} />
				<Button title="REGISTER" onPress={registerHandler} revert={true} />
			</Animated.View>
			<Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
				{isRegistering ? <Register /> : <LogIn />}
			</Animated.View>
		</View>
	);
}
