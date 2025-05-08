import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { ITaskData } from '../../../store/useTasksStore'
import CheckButton from './CheckButton'

interface ITextInputTaskProps {
	partialAnswer: ITaskData['partialAnswer']
	correctAnswer: ITaskData['correctAnswer']
	onComplete: (isCorrect: boolean) => void
}

const TextInputTask = ({ partialAnswer, correctAnswer, onComplete }: ITextInputTaskProps) => {
	const [inputText, setInputText] = useState('')

	const inputRef = useRef<TextInput>(null)
	const [hiddenInputWidth, setHiddenInputWidth] = useState(0)

	useEffect(() => {
		setInputText('')
	}, [correctAnswer])

	const parseInput = (str: string) => {
		return (partialAnswer[0] + ' ' + str + ' ' + partialAnswer[1])
			.trim()
			.replaceAll(/ +/g, ' ')
			.toLowerCase()
	}

	const handleSubmit = () => {
		onComplete(parseInput(inputText) === correctAnswer.toLowerCase())
	}

	return (
		<View style={styles.root}>
			<Pressable onPress={() => inputRef.current?.focus()} style={styles.content}>
				<Text style={styles.text}>{partialAnswer[0]} </Text>
				<Text
					onLayout={event => setHiddenInputWidth(event.nativeEvent.layout.width)}
					style={[styles.inputText, { position: 'absolute', opacity: 0 }]}>
					{correctAnswer.replace(partialAnswer[0], '').replace(partialAnswer[1], '')}
				</Text>

				<TextInput
					ref={inputRef}
					style={[styles.inputText, { width: hiddenInputWidth * 1.1 + 5 }]}
					value={inputText}
					onChangeText={setInputText}
					autoCapitalize='none'
					autoCorrect={false}
					autoComplete='off'
					maxLength={30}
				/>
				<Text style={styles.text}> {partialAnswer[1]}</Text>
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
		alignItems: 'flex-end',
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
		fontSize: 20,
		lineHeight: 24,
		borderBottomWidth: 2,
		borderColor: '#3333',
		paddingHorizontal: 4,
		paddingBottom: 0,
	},
})

export default TextInputTask
