import { StyleSheet, Text, View } from 'react-native'

import { ITask } from '../../../app/store/useTasksStore'

interface ITaskQuestionProps {
	type: ITask['type']
	question: ITask['question']
}
const TaskQuestion = ({ type, question }: ITaskQuestionProps) => (
	<View style={styles.root}>
		<Text style={styles.title}>
			{type === 'wordPicker' ? 'Переведите предложение' : 'Дополните перевод'}
		</Text>
		<View style={styles.cloud}>
			<Text style={styles.text}>{question}</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	root: {
		borderRadius: 12,
		alignItems: 'center',
	},
	title: { fontSize: 24, fontWeight: 'bold' },
	cloud: {
		marginTop: 32,
		marginVertical: 'auto',
		maxWidth: 256,
		padding: 16,
		borderWidth: 2,
		borderColor: '#3333',
		borderRadius: 8,
	},
	text: {
		fontSize: 16,
		fontWeight: 'medium',
	},
})

export default TaskQuestion
