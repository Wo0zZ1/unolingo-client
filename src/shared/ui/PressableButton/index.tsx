import { memo, ReactNode, useRef } from 'react'
import {
	Animated,
	ColorValue,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'

export interface IPressableButtonProps {
	onPressIn?: () => void
	onPressOut?: () => void
	onPress?: () => void
	children: ReactNode
	bgFront: ColorValue
	bgBack: ColorValue
	borderRadius?: number | string
	yOffset?: number
	disabled?: boolean
	longPress?: boolean
	style?: StyleProp<ViewStyle>
}

const PressableButton = memo(
	({
		onPressIn = () => {},
		onPressOut = () => {},
		onPress = () => {},
		children,
		bgFront,
		bgBack,
		borderRadius = 8,
		yOffset = 4,
		disabled = false,
		longPress = false,
		style,
	}: IPressableButtonProps) => {
		const translateY = useRef(new Animated.Value(-yOffset)).current

		const handlePressIn = () => {
			if (disabled || longPress) return

			onPressIn()
			Animated.timing(translateY, {
				toValue: 0,
				duration: 50,
				useNativeDriver: true,
			}).start()
		}

		const handlePressOut = () => {
			if (disabled || longPress) return

			onPressOut()
			Animated.timing(translateY, {
				toValue: -yOffset,
				duration: 30,
				useNativeDriver: true,
			}).start()
		}

		const handleTouchStart = () => {
			if (disabled || !longPress) return

			onPressOut()
			Animated.timing(translateY, {
				toValue: 0,
				duration: 50,
				useNativeDriver: true,
			}).start()
		}

		const handleTouchEnd = () => {
			if (disabled || !longPress) return

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
				onTouchStart={handleTouchStart}
				onPressOut={handlePressOut}
				onTouchEnd={handleTouchEnd}
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
	},
)

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
