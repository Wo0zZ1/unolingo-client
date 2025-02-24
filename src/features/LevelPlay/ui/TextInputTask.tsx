import { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'

interface ITextInputTaskProps {
	correctAnswer: string
	onComplete: (isCorrect: boolean) => void
}

const TextInputTask = ({
	correctAnswer,
	onComplete,
}: ITextInputTaskProps) => {
	const [inputText, setInputText] = useState('')

	const handleSubmit = () => {
		onComplete(inputText.trim() === correctAnswer)
	}

	return (
		<View style={styles.root}>
			<TextInput
				style={styles.input}
				value={inputText}
				onChangeText={setInputText}
				placeholder='Введите ответ'
			/>
			<Button title='Проверить' onPress={handleSubmit} />
		</View>
	)
}
const styles = StyleSheet.create({
	root: {
		width: '100%',
		alignItems: 'center',
	},
	input: {
		width: '80%',
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 8,
		marginBottom: 20,
	},
})

export default TextInputTask
