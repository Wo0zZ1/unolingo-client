import * as Haptics from 'expo-haptics'

import { useState } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Animated, {
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

interface IWordPickerProps {
	options: string[]
	correctAnswer: string
	onComplete: (isCorrect: boolean) => void
}

const WordPicker = ({
	correctAnswer,
	options,
	onComplete,
}: IWordPickerProps) => {
	const [selectedWords, setSelectedWords] = useState<string[]>([])
	const scale = useSharedValue(1)

	const handleWordPress = (word: string) => {
		const newSelectedWords = [...selectedWords, word]
		setSelectedWords(newSelectedWords)

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

		scale.value = withSpring(
			0.9,
			{ damping: 2, stiffness: 100 },
			() => {
				scale.value = withSpring(1)
			},
		)

		if (newSelectedWords.join(' ') === correctAnswer) {
			onComplete(true)
		}
	}

	return (
		<View style={styles.root}>
			<View style={styles.wordsContainer}>
				{options.map(word => (
					<Animated.View
						key={word}
						style={{ transform: [{ scale }] }}>
						<TouchableOpacity
							style={styles.wordButton}
							onPress={() => handleWordPress(word)}>
							<Text style={styles.wordText}>{word}</Text>
						</TouchableOpacity>
					</Animated.View>
				))}
			</View>
			<View style={styles.selectedWordsContainer}>
				<Text style={styles.selectedWordsText}>
					{selectedWords.join(' ')}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
	},
	wordsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	wordButton: {
		backgroundColor: '#e0e0e0',
		padding: 10,
		borderRadius: 8,
		margin: 5,
	},
	wordText: {
		fontSize: 16,
	},
	selectedWordsContainer: {
		marginTop: 20,
		padding: 10,
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
	},
	selectedWordsText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
})

export default WordPicker
