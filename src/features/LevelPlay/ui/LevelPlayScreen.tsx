import { useEffect, useLayoutEffect, useState } from 'react'
import {
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'

import TaskQuestion from './TaskQuestion'
import WordPicker from './WordPicker'
import TextInputTask from './TextInputTask'

import { RootStackParamList } from '../../../app/navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { useLevelStatsStore } from '../../../app/store/useLevelStatsStore'
import { useTasksStore } from '../../../app/store/useTasksStore'
import QuitButton from './QuitButton'
import ProgressBar from './ProgressBar'

interface ILevelPlayScreenProps {
	route: RouteProp<RootStackParamList, 'LevelPlay'>
}

const LevelPlayScreen = ({ route }: ILevelPlayScreenProps) => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList>>()

	const { levelId } = route.params

	const { tasks, fetching, fetchTasks } = useTasksStore()

	const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0)

	const currentTask = tasks[currentTaskIndex]

	const { incrementErrors, startTimer, stopTimer } =
		useLevelStatsStore()

	useEffect(() => {
		fetchTasks(levelId)
		startTimer()
	}, [])

	const handleTaskComplete = (isCorrect: boolean) => {
		if (isCorrect) {
			if (currentTaskIndex + 1 === tasks.length) {
				stopTimer()
				navigation.navigate('LevelStats')
			} else setCurrentTaskIndex(prev => prev + 1)
		} else {
			incrementErrors()
			alert('Неправильно, попробуйте еще раз!')
		}
	}

	if (fetching)
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					{/* Кнопка выхода */}
					<QuitButton style={styles.close} />
				</View>
				<Text style={{ fontSize: 30 }}>Идет поиск заданий...</Text>
			</View>
		)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{/* Кнопка выхода */}
				<QuitButton style={styles.close} />

				{/* Шкала прогресса */}
				<ProgressBar
					style={styles.bar}
					lastProgress={(currentTaskIndex - 1) / tasks.length}
					progress={currentTaskIndex / tasks.length}
					// width={450}
				/>
			</View>

			{/* Содержимое вопроса */}
			<TaskQuestion
				type={currentTask.type}
				question={currentTask.question}
			/>

			<View style={styles.content}>
				{/* Поле для ввода и кнопка "Проверить" */}
				{currentTask.type === 'wordPicker' ? (
					<WordPicker
						options={currentTask.options}
						correctAnswer={currentTask.correctAnswer}
						onComplete={handleTaskComplete}
					/>
				) : (
					<TextInputTask
						partialAnswer={currentTask.partialAnswer}
						correctAnswer={currentTask.correctAnswer}
						onComplete={handleTaskComplete}
					/>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		zIndex: 10,
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		height: 40,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
	close: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
	},
	bar: {
		marginLeft: 20,
		maxWidth: 450,
	},
	content: {
		flex: 1,
		width: '100%',
		marginTop: 24,
	},
})

export default LevelPlayScreen
