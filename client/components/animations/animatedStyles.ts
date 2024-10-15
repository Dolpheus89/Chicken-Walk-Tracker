import { Dimensions } from "react-native";
import {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	withTiming,
	withDelay,
} from "react-native-reanimated";

export const useAnimatedStyles = () => {
	const { height } = Dimensions.get("window");
	const imagePosition = useSharedValue(1);

	const imageAnimatedStyle = useAnimatedStyle(() => {
		const interpolation = interpolate(
			imagePosition.value,
			[0, 1],
			[-height + 100, 0],
		);
		return {
			transform: [
				{ translateY: withTiming(interpolation, { duration: 1000 }) },
			],
		};
	});

	const closeAnimatedStyle = useAnimatedStyle(() => {
		const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
		return {
			opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
			transform: [
				{ rotate: withTiming(`${interpolation}deg`, { duration: 1000 }) },
			],
		};
	});

	const buttonsAnimatedStyle = useAnimatedStyle(() => {
		const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
		return {
			opacity: withTiming(imagePosition.value, { duration: 500 }),
			transform: [
				{ translateY: withTiming(interpolation, { duration: 1000 }) },
			],
		};
	});

	const formAnimatedStyle = useAnimatedStyle(() => {
		const interpolation = interpolate(imagePosition.value, [0, 1], [50, 500]);
		return {
			opacity:
				imagePosition.value === 0
					? withDelay(400, withTiming(1, { duration: 800 }))
					: withTiming(0, { duration: 300 }),
			transform: [{ translateY: withTiming(interpolation, { duration: 800 }) }],
		};
	});

	return {
		imagePosition,
		imageAnimatedStyle,
		closeAnimatedStyle,
		buttonsAnimatedStyle,
		formAnimatedStyle,
	};
};
