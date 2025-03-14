import { useRef, useState } from 'react'
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

	const handleTextPress = () => {
		inputRef.current?.focus()
	}

	const parseInput = (str: string) => {
		return str.trim().replaceAll(/ +/g, ' ').toLowerCase()
	}

	const handleSubmit = () => {
		onComplete(parseInput(inputText) === correctAnswer.toLowerCase())
	}

	return (
		<View style={styles.root}>
			<Pressable style={styles.content} onPress={handleTextPress}>
				<Text style={styles.text}>
					<Text>{partialAnswer[0]} </Text>
					<Text style={[styles.text, styles.inputText]}>{inputText}</Text>
					<Text> {partialAnswer[1]}</Text>
				</Text>
				<TextInput
					ref={inputRef}
					style={styles.hiddenInput}
					value={inputText}
					onChangeText={setInputText}
					autoCapitalize='none'
					autoComplete='off'
					maxLength={40}
				/>
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
		height: '100%',
		position: 'relative',
		gap: 5,
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
		borderBottomWidth: 2,
		borderColor: '#3333',
		paddingHorizontal: 4,
		minWidth: 50,
	},
	hiddenInput: {
		position: 'absolute',
		flex: 1,
		width: 0,
		height: 0,
		opacity: 0,
	},
})

export default TextInputTask
