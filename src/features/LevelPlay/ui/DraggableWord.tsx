import * as Haptics from 'expo-haptics'

import { StyleSheet, Text, View } from 'react-native'
import {
	Gesture,
	GestureDetector,
} from 'react-native-gesture-handler'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import PressableButton from '../../../shared/ui/buttons/PressableButton'

interface IDraggableWordProps {
	word: string
	onSelect: (word: string) => void
}

const DraggableWord = ({ onSelect, word }: IDraggableWordProps) => {
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const gesture = Gesture.Pan()
		.runOnJS(true)
		.onBegin(() => {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		})
		.onUpdate(e => {
			offsetX.value = e.translationX
			offsetY.value = e.translationY
		})
		.onFinalize(() => {
			onSelect(word)
		})

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: offsetX.value },
			{ translateY: offsetY.value },
		],
	}))

	return (
		<View style={{ flexDirection: 'row', height: 'auto' }}>
			<GestureDetector gesture={gesture}>
				<Animated.View style={[animatedStyle]}>
					<PressableButton
						style={styles.wordButton}
						bgFront={'#fff'}
						bgBack={'#3333'}
						yOffset={3}
						longPress={true}>
						<Text style={styles.wordText}>{word}</Text>
					</PressableButton>
				</Animated.View>
			</GestureDetector>
		</View>
	)
}

const styles = StyleSheet.create({
	wordButton: {
		flexDirection: 'row',
		borderColor: '#3333',
		borderWidth: 1.5,
		padding: 10,
		borderRadius: 8,
	},
	wordText: {
		fontSize: 16,
	},
})

export default DraggableWord
