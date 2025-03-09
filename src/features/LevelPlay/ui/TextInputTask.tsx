import { useRef, useState } from 'react'
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import CheckButton from './CheckButton'
import {
	ITask,
	ITaskTextInput,
} from '../../../app/store/useTasksStore'

interface ITextInputTaskProps {
	partialAnswer: ITaskTextInput['partialAnswer']
	correctAnswer: ITask['correctAnswer']
	onComplete: (isCorrect: boolean) => void
}

const TextInputTask = ({
	partialAnswer,
	correctAnswer,
	onComplete,
}: ITextInputTaskProps) => {
	const [inputText, setInputText] = useState('')

	//
	const inputRef = useRef<TextInput>(null)

	const handleTextPress = () => {
		inputRef.current?.focus()
	}
	//

	const handleSubmit = () => {
		onComplete(
			inputText.trim().toLowerCase() === correctAnswer.toLowerCase(),
		)
	}

	return (
		<View style={styles.root}>
			<View style={styles.content}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{partialAnswer[0]}</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							maxLength={40}
							onChangeText={setInputText}
							value={inputText}
							autoCapitalize='none'
							autoComplete='off'
						/>
						<View style={styles.underline} />
					</View>
					<Text style={styles.text}>{partialAnswer[1]}</Text>
				</View>
			</View>
			<CheckButton onPress={handleSubmit} />
		</View>
	)
}
const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	content: {
		flex: 1,
		backgroundColor: '#3331',
		borderColor: '#3333',
		borderWidth: 1.5,
		padding: 10,
		borderRadius: 8,
	},
	textContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 8,
	},
	text: {
		fontSize: 20,
		lineHeight: 20,
	},
	inputContainer: {
		position: 'relative',
		minWidth: 50, // Минимальная ширина поля ввода
	},
	input: {
		fontSize: 20,
		paddingHorizontal: 4, // Убираем внутренние отступы
	},
	underline: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 2,
		backgroundColor: '#3333',
	},
})

export default TextInputTask
