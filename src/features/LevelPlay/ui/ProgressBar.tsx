import { StyleSheet, Text, View } from 'react-native'

interface IProgressBarProps {
	currentTaskIndex: number
	tasksLength: number
}

const ProgressBar = ({
	currentTaskIndex,
	tasksLength,
}: IProgressBarProps) => {
	return (
		<View style={styles.progressBarContainer}>
			<View
				style={[
					styles.progressBar,
					{ width: `${(currentTaskIndex / tasksLength) * 100}%` },
				]}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	progressBarContainer: {
		height: 10,
		width: '100%',
		maxWidth: 400,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
		marginBottom: 20,
	},
	progressBar: {
		height: '100%',
		backgroundColor: 'tomato',
		borderRadius: 5,
	},
})

export default ProgressBar
