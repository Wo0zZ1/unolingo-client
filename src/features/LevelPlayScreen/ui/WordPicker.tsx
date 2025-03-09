import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CheckButton from './CheckButton'
import DraggableWord from './DraggableWord'

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
	const [availableWords, setAvailableWords] =
		useState<string[]>(options)

	const handleWordRemove = (word: string) => {
		setSelectedWords(prev => prev.filter(w => w !== word))
		setAvailableWords(prev => [...prev, word])
	}

	const handleWordAdd = (word: string) => {
		setSelectedWords(prev => [...prev, word])
		setAvailableWords(prev => prev.filter(w => w !== word))
	}

	const handleSubmit = () => {
		// TODO Выполнить преобразование строки (trim, replace...)
		onComplete(selectedWords.join(' ') === correctAnswer)
	}

	return (
		<View style={styles.root}>
			{/* Область для выбранных слов */}
			<View style={styles.wordsBlock}>
				<View style={styles.wordsContainer}>
					{selectedWords.map((word, index) => (
						<DraggableWord
							key={word}
							word={word}
							onSelect={handleWordRemove}
						/>
					))}
				</View>
			</View>

			{/* Область для доступных слов */}
			<View style={styles.wordsBlock}>
				<View style={styles.wordsContainer}>
					{availableWords.map((word, index) => (
						<DraggableWord
							key={word}
							word={word}
							onSelect={handleWordAdd}
						/>
					))}
				</View>
			</View>

			{/* Кнопка проверки ответа */}
			<CheckButton onPress={handleSubmit} />
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'space-between',
	},
	wordsBlock: {
		height: '35%',
	},
	wordsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 5,
	},
})

export default WordPicker
