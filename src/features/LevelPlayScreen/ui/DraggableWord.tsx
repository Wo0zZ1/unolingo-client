import { memo } from 'react'
import * as Haptics from 'expo-haptics'
import { StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import type { IWord } from './WordPicker'

import { PressableButton } from '../../../shared/ui'

interface IDraggableWordProps {
	word: IWord
	hidden?: boolean
	withBg?: boolean
	onSelect: (wordId: number) => void
}

const DraggableWord = memo(
	({ onSelect, word, hidden = false, withBg = false }: IDraggableWordProps) => {
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
				onSelect(word.id)
				setTimeout(() => {
					offsetX.value = 0
					offsetY.value = 0
				})
			})

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
		}))

		return (
			<View style={{ borderRadius: 8, backgroundColor: withBg ? '#F2F2F2' : '' }}>
				<GestureDetector gesture={gesture}>
					<Animated.View style={[animatedStyle, { opacity: hidden ? 0 : 100 }]}>
						<PressableButton
							style={styles.wordButton}
							bgFront={'#fff'}
							bgBack={'#3333'}
							yOffset={3}>
							<Text style={styles.wordText}>{word.text}</Text>
						</PressableButton>
					</Animated.View>
				</GestureDetector>
			</View>
		)
	},
)

const styles = StyleSheet.create({
	wordButton: {
		flexDirection: 'row',
		borderColor: '#3333',
		borderWidth: 1.5,
		padding: 10,
	},
	wordText: {
		fontSize: 16,
	},
})

export default DraggableWord
