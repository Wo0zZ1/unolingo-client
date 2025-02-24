import { useEffect, useLayoutEffect, useState } from 'react'
import {
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'

import TaskBubble from './TaskBubble'
import WordPicker from './WordPicker'
import TextInputTask from './TextInputTask'

import { RootStackParamList } from '../../../app/navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { useLevelStatsStore } from '../../../app/store/useLevelStatsStore'
import { useTasksStore } from '../../../app/store/useTasksStore'
import QuitButton from './quitButton'
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
				<QuitButton />

				<Text style={{ fontSize: 30 }}>Идет поиск заданий...</Text>
			</View>
		)

	return (
		<View style={styles.container}>
			<QuitButton />

			<ProgressBar
				currentTaskIndex={currentTaskIndex}
				tasksLength={tasks.length}
			/>

			<TaskBubble question={currentTask.question} />

			{/* Поле для ввода и кнопка "Проверить" */}
			{currentTask.type === 'wordPicker' ? (
				<WordPicker
					options={currentTask.options!}
					correctAnswer={currentTask.correctAnswer}
					onComplete={handleTaskComplete}
				/>
			) : (
				<TextInputTask
					correctAnswer={currentTask.correctAnswer}
					onComplete={handleTaskComplete}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default LevelPlayScreen
