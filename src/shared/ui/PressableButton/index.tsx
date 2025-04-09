import * as Haptics from 'expo-haptics'
import { ReactNode, useRef } from 'react'
import {
	Animated,
	ColorValue,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import vibrate from '../../../utils/vibrate'
import { COLORS } from '../../../constants/theme'

export interface IPressableButtonProps {
	onPressIn?: () => void
	onPressOut?: () => void
	onPress?: () => void
	withVibrate?: boolean
	children: ReactNode
	bgFront: ColorValue
	bgBack: ColorValue
	borderRadius?: number | string
	yOffset?: number
	disabled?: boolean
	style?: StyleProp<ViewStyle>
}

const PressableButton = ({
	onPressIn = () => {},
	onPressOut = () => {},
	onPress = () => {},
	withVibrate = false,
	children,
	bgFront,
	bgBack,
	borderRadius = 8,
	yOffset = 4,
	disabled = false,
	style,
}: IPressableButtonProps) => {
	const translateY = useRef(new Animated.Value(-yOffset)).current

	const handlePressIn = () => {
		if (disabled) return
		withVibrate && vibrate('light')
		onPressIn()
		Animated.timing(translateY, {
			toValue: 0,
			duration: 50,
			useNativeDriver: true,
		}).start()
	}

	const handlePressOut = () => {
		if (disabled) return
		onPressOut()
		Animated.timing(translateY, {
			toValue: -yOffset,
			duration: 30,
			useNativeDriver: true,
		}).start()
	}

	const handlePress = () => {
		if (disabled) return
		onPress()
	}

	return (
		<Pressable
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
			style={styles.root}>
			<View
				style={[
					styles.back,
					{
						borderRadius: borderRadius,
						backgroundColor: disabled ? '#4d4d4d' : bgBack,
					},
				]}
			/>
			<Animated.View
				style={[
					style,
					{
						transform: [{ translateY }],
						borderRadius: borderRadius,
						backgroundColor: disabled ? 'gray' : bgFront,
					},
				]}>
				{children}
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
	},
	back: {
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
})

export { PressableButton }
