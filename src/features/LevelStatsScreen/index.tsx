import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import {
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '../../app/navigation/types'
import { useLevelStatsStore } from '../../app/store/useLevelStatsStore'
import { useTasksStore } from '../../app/store/useTasksStore'
import { useUserStore } from '../../app/store/useUserStore'
import ContinueButton from './ui/ContinueButton'

const LevelStatsScreen = () => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList>>()

	const { errors, startTime, endTime, resetStats } =
		useLevelStatsStore()

	const {
		experience,
		experienceToNextLevel,
		experienceTotal,
		level,
		addExperience,
	} = useUserStore()

	const [progress] = useState(new Animated.Value(experience))

	const { tasks } = useTasksStore()

	const errorPercentage = Math.min(1, errors / tasks.length) * 100
	const timeSpent = (endTime! - startTime!) / 1000

	// TODO Откорректировать формулу
	// Формула начисления опыта
	const awardedExperience = Math.round(
		((100 - errorPercentage) / 100) *
			Math.max(0, 1 - timeSpent / 60 / 3) *
			100,
	)

	const [oldData, setOldData] = useState<{
		experience: number
		experienceToNextLevel: number
		level: number
	}>()

	useFocusEffect(
		useCallback(() => {
			setOldData({
				experience,
				experienceToNextLevel,
				level,
			})

			Animated.timing(progress, {
				toValue: Math.min(
					experience + awardedExperience,
					experience + experienceToNextLevel,
				),
				duration: 1000,
				useNativeDriver: false,
			}).start()

			addExperience(awardedExperience)
		}, []),
	)

	const handleDone = () => {
		resetStats()
		navigation.navigate('MainTabs')
	}

	return (
		<View style={styles.root}>
			<Text style={styles.title}>Статистика прохождения уровня</Text>

			<View style={styles.statsContainer}>
				<Text style={styles.statText}>
					Ошибки: {errors} ({errorPercentage.toFixed(0)}%)
				</Text>
				<Text style={styles.statText}>
					Время: {timeSpent.toFixed(0)} сек
				</Text>
				<Text style={styles.statText}>
					заработанный опыт: {awardedExperience} XP
				</Text>
			</View>

			<View style={styles.progressContainer}>
				<Text style={styles.statText}>
					Опыта до следующего уровня
				</Text>
				<View style={styles.progressBarBackground}>
					<Animated.View
						style={[
							styles.progressBar,
							{
								width: progress.interpolate({
									inputRange: [
										0,
										(oldData?.experience || 0) +
											(oldData?.experienceToNextLevel || 0),
									],
									outputRange: ['0%', '100%'],
								}),
							},
						]}
					/>
				</View>
			</View>

			<View
				style={{
					display: oldData?.level !== level ? 'flex' : 'none',
				}}>
				<Text style={styles.statText}>NEW {level} LEVEL!</Text>
			</View>

			<ContinueButton onPress={handleDone} />
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	statsContainer: {
		alignItems: 'center',
		marginBottom: 40,
	},
	statText: {
		fontSize: 18,
		marginBottom: 10,
	},
	progressContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},
	progressBarBackground: {
		width: '60%',
		height: 10,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
	},
	progressBar: {
		height: '100%',
		backgroundColor: 'tomato',
		borderRadius: 5,
	},
})

export default LevelStatsScreen
