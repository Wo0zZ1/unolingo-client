import { memo, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
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
import { COLORS } from '../../constants/theme'

const LevelPlayScreen = memo(() => {
	const route = useRoute<RouteProp<RootStackParamList, 'LevelPlay'>>()
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LevelPlay'>>()

	const { levelId } = route.params

	const { tasks, fetching, fetchTasks } = useTasksStore()

	const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0)

	const currentTask = tasks[currentTaskIndex]

	const { incrementErrors, startTimer, stopTimer } = useLevelStatsStore()

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

	if (fetching) return <LoadingScreen title={'Идет поиск заданий...'} />

	return (
		<>
			<Header>
				<ProgressBar
					style={styles.bar}
					from={(currentTaskIndex - 1) / tasks.length}
					to={currentTaskIndex / tasks.length}
				/>
			</Header>
			<View style={styles.container}>
				{/* Содержимое вопроса */}
				<TaskQuestion type={currentTask.type} question={currentTask.question} />

				{/* Форма ответа */}
				<KeyboardAvoidingView
					style={styles.content}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={120}>
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
				</KeyboardAvoidingView>
			</View>
		</>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
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
