import { StyleSheet, Text, View } from 'react-native'
import { ITask } from '../model/tasks'

interface ITaskBubbleProps {
	question: ITask['question']
}
const TaskBubble = ({ question }: ITaskBubbleProps) => (
	<View style={styles.root}>
		<Text style={styles.text}>{question}</Text>
	</View>
)

const styles = StyleSheet.create({
	root: {
		backgroundColor: '#f0f0f0',
		padding: 16,
		borderRadius: 12,
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'justify',
	},
})

export default TaskBubble
