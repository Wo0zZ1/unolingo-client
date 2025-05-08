import { memo, useEffect, useState } from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../../navigation/types'

import TaskQuestion from './ui/TaskQuestion'
import WordPicker from './ui/WordPicker'
import TextInputTask from './ui/TextInputTask'

import { useTasksStore } from '../../store/useTasksStore'
import { useLevelStatsStore } from '../../store/useLevelStatsStore'

import { Header, LoadingScreen } from '../../widgets/ui'
import { ProgressBar } from '../../shared/ui'

const LevelPlayScreen = memo(() => {
	const route = useRoute<RouteProp<RootStackParamList, 'LevelPlay'>>()
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LevelPlay'>>()

	const { levelId, levelGlobalOrder } = route.params

	const { tasksData, fetching: tasksFetching, fetchTasks } = useTasksStore()

	const { incrementErrors, startTimer, stopTimer } = useLevelStatsStore()

	useEffect(() => {
		if (!tasksFetching) fetchTasks(levelId)
	}, [levelId])

	useEffect(() => {
		if (tasksData) startTimer()
	}, [tasksFetching])

	const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(1)

	if (!tasksData || tasksFetching) return <LoadingScreen title='Загрузка уровня...' />

	const currentTask = tasksData.find(task => task.order === currentTaskIndex)

	if (!currentTask) return <LoadingScreen title='Не удалось найти задание' />

	const handleTaskComplete = (isCorrect: boolean) => {
		if (isCorrect) {
			if (currentTaskIndex === tasksData.length) {
				stopTimer()
				navigation.navigate('LevelStats', {
					levelId,
					levelGlobalOrder,
					tasksLength: tasksData.length,
				})
			} else setCurrentTaskIndex(prev => prev + 1)
		} else {
			incrementErrors()
			alert('Неправильно, попробуйте еще раз!')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ flex: 1 }}>
				<Header>
					<ProgressBar
						style={styles.bar}
						from={(currentTaskIndex - 2) / tasksData.length}
						to={(currentTaskIndex - 1) / tasksData.length}
					/>
				</Header>
				<View style={styles.container}>
					{/* Содержимое вопроса */}
					<TaskQuestion type={currentTask.type} question={currentTask.question} />

					{/* Форма ответа */}
					<KeyboardAvoidingView
						style={styles.content}
						behavior={'padding'}
						keyboardVerticalOffset={120}>
						{currentTask.type === 'WORD_PICKER' ? (
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
					</KeyboardAvoidingView>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
})

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
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

export { LevelPlayScreen }
