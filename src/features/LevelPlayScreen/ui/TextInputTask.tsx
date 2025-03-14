import { memo, useCallback, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { ITask, ITaskTextInput } from '../../../store/useTasksStore'
import CheckButton from './CheckButton'

interface ITextInputTaskProps {
	partialAnswer: ITaskTextInput['partialAnswer']
	correctAnswer: ITask['correctAnswer']
	onComplete: (isCorrect: boolean) => void
}

const TextInputTask = ({ partialAnswer, correctAnswer, onComplete }: ITextInputTaskProps) => {
	const [inputText, setInputText] = useState('')

	const inputRef = useRef<TextInput>(null)
	const [hiddenInputWidth, setHiddenInputWidth] = useState(0)

	const handleTextPress = useCallback(() => {
		inputRef.current?.focus()
	}, [])

	const parseInput = useCallback((str: string) => {
		return str.trim().replaceAll(/ +/g, ' ').toLowerCase()
	}, [])

	const handleSubmit = useCallback(() => {
		onComplete(parseInput(inputText) === correctAnswer.toLowerCase())
	}, [inputText])

	return (
		<View style={styles.root}>
			<Pressable onPress={handleTextPress} style={styles.content}>
				<Text style={styles.text}>{partialAnswer[0]} </Text>
				<Text
					onLayout={event => setHiddenInputWidth(event.nativeEvent.layout.width)}
					style={[styles.text, styles.inputText, { position: 'absolute', opacity: 0 }]}>
					{correctAnswer}
				</Text>

				<TextInput
					ref={inputRef}
					style={[styles.text, styles.inputText, { width: hiddenInputWidth * 1.1 + 5 }]}
					value={inputText}
					onChangeText={setInputText}
					autoCapitalize='none'
					autoCorrect={false}
					autoComplete='off'
					maxLength={30}></TextInput>
				<Text style={styles.text}> {partialAnswer[1]}</Text>
				<TextInput />
			</Pressable>
			<CheckButton disabled={parseInput(inputText).length === 0} onPress={handleSubmit} />
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	content: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		backgroundColor: '#3331',
		borderColor: '#3333',
		borderWidth: 1.5,
		padding: 10,
		borderRadius: 8,
	},
	text: {
		fontSize: 20,
		lineHeight: 24,
	},
	inputText: {
		height: 24,
		borderBottomWidth: 2,
		borderColor: '#3333',
		paddingHorizontal: 4,
	},
})

export default TextInputTask
