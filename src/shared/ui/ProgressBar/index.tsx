import { memo, useEffect } from 'react'
import {
	Animated,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'

interface IProgressBarProps {
	style?: StyleProp<ViewStyle>
	from: number
	to: number
}

const ProgressBar = memo(({ style, from, to }: IProgressBarProps) => {
	const currentWidth = new Animated.Value(from)

	useEffect(() => {
		Animated.timing(currentWidth, {
			toValue: to,
			useNativeDriver: false,
		}).start()
	})

	return (
		<View style={[style, styles.progressBarContainer]}>
			<Animated.View
				style={[
					styles.progressBar,
					{
						width: currentWidth.interpolate({
							inputRange: [0, 1],
							outputRange: ['0%', '100%'],
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					},
				]}
			/>
		</View>
	)
})

const styles = StyleSheet.create({
	progressBarContainer: {
		height: 20,
		width: '100%',
		flexGrow: 1,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
	},
	progressBar: {
		height: '100%',
		maxWidth: '100%',
		backgroundColor: 'tomato',
		borderRadius: 5,
	},
})

export default ProgressBar
