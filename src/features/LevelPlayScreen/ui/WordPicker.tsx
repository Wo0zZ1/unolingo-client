import { memo, useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CheckButton from './CheckButton'
import DraggableWord from './DraggableWord'
import AvailableWords from './AvailableWords'

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

const WordPicker = memo(({ correctAnswer, options, onComplete }: IWordPickerProps) => {
	const [words, setWords] = useState<IWord[]>(() =>
		options
			.map((option, index) => ({ id: index, text: option, selected: false }))
			.sort((a, b) => a.id - b.id),
	)
	const [selectedWords, setSelectedWords] = useState<IWord[]>([])

	const handleWordRemove = useCallback(
		(wordId: number) => {
			setWords(prev => {
				const word = words.find(word => word.id === wordId)
				if (!word) throw new Error("Word doesn't exists")
				word.selected = false
				return [...prev.filter(word => word.id !== wordId), word].sort((a, b) => a.id - b.id)
			})
			setSelectedWords(prev => prev.filter(word => word.id !== wordId))
		},
		[setWords, setSelectedWords],
	)

	const handleWordAdd = useCallback(
		(wordId: number) => {
			setWords(prev => {
				const word = words.find(word => word.id === wordId)
				if (!word) throw new Error("Word doesn't exists")
				word.selected = true
				return [...prev.filter(word => word.id !== wordId), word].sort((a, b) => a.id - b.id)
			})
			setSelectedWords(prev => [...prev, ...words.filter(word => word.id === wordId)])
		},
		[setWords, setSelectedWords],
	)

	const handleSubmit = useCallback(() => {
		// TODO Выполнить преобразование строки (trim, replace...)
		onComplete(selectedWords.map(word => word.text).join(' ') === correctAnswer)
	}, [onComplete, words])

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
})

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
