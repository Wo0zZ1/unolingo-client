import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CheckButton from './CheckButton'
import DraggableWord from './DraggableWord'

export interface IWord {
	id: number
	text: string
	selected: boolean
}

interface IWordPickerProps {
	options: string[]
	correctAnswer: string
	onComplete: (isCorrect: boolean) => void
}

const WordPicker = ({ correctAnswer, options, onComplete }: IWordPickerProps) => {
	const [words, setWords] = useState<IWord[]>([])
	const [selectedWords, setSelectedWords] = useState<IWord[]>([])

	useEffect(() => {
		setWords(
			options
				.map((option, index) => ({ id: index, text: option, selected: false }))
				.sort((a, b) => a.id - b.id),
		)
		setSelectedWords([])
	}, [options])

	const handleWordRemove = (wordId: number) => {
		setWords(prev => {
			const word = words.find(word => word.id === wordId)
			if (!word) throw new Error("Word doesn't exist")
			word.selected = false
			return [...prev.filter(word => word.id !== wordId), word].sort((a, b) => a.id - b.id)
		})
		setSelectedWords(prev => prev.filter(word => word.id !== wordId))
	}

	const handleWordAdd = (wordId: number) => {
		setWords(prev => {
			const word = words.find(word => word.id === wordId)
			if (!word) throw new Error("Word doesn't exist")
			word.selected = true
			return [...prev.filter(word => word.id !== wordId), word].sort((a, b) => a.id - b.id)
		})
		setSelectedWords(prev => [...prev, ...words.filter(word => word.id === wordId)])
	}

	const handleSubmit = () => {
		onComplete(
			selectedWords
				.map(word => word.text)
				.join(' ')
				.toLowerCase()
				.replaceAll(" '", "'") === correctAnswer.toLowerCase(),
		)
	}

	return (
		<View style={styles.root}>
			{/* Область для выбранных слов */}
			<View style={styles.wordsContainer}>
				{selectedWords.map(word => (
					<DraggableWord key={word.id} word={word} onSelect={handleWordRemove} />
				))}
			</View>

			{/* Область для доступных слов */}
			<View style={[styles.wordsContainer, { justifyContent: 'center' }]}>
				{words.map(word => (
					<DraggableWord
						key={word.id}
						hidden={word.selected}
						word={word}
						withBg={true}
						onSelect={handleWordAdd}
					/>
				))}
			</View>

			{/* Кнопка проверки ответа */}
			<CheckButton
				disabled={words.filter(word => !word.selected).length > 0}
				onPress={handleSubmit}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'space-between',
	},
	wordsContainer: {
		height: '35%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})

export default WordPicker
