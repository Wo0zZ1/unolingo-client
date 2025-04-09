import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '../../navigation/types'

import ContinueButton from './ui/ContinueButton'
import { useLevelStatsStore } from '../../store/useLevelStatsStore'
import { useUserStatStore } from '../../store/useUserStatStore'
import { LoadingScreen } from '../../widgets/ui'
import { useMapStore } from '../../store/useMapStore'
import { useUserProgressStore } from '../../store/useUserProgressStore'

const LevelStatsScreen = () => {
	const route = useRoute<RouteProp<RootStackParamList, 'LevelStats'>>()
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LevelStats'>>()

	const { levelId, levelGlobalOrder, tasksLength } = route.params

	const {
		levelStatsData,
		levelStatsResponse,
		fetchResult,
		reset,
		fetching: levelStatsFetching,
	} = useLevelStatsStore()
	const { fetchMapData } = useMapStore()
	const { userProgressData } = useUserProgressStore()
	const { userStatData, fetchUserStatData, fetching: userStatFetching } = useUserStatStore()

	useEffect(() => {
		if (!levelStatsResponse) {
			fetchResult(levelStatsData, levelId, levelGlobalOrder)
			if (userProgressData?.lastSelectedLanguageId) {
				// TODO ПРОДОЛЖИТЬ
				console.log(123)
				fetchMapData(userProgressData.lastSelectedLanguageId)
			}
		}
	}, [])

	useEffect(() => {
		if (levelStatsResponse) fetchUserStatData()
	}, [levelStatsResponse])

	useEffect(() => {
		if (levelStatsResponse && userStatData)
			Animated.timing(progress, {
				toValue: levelUp ? 1 : experience / experienceToNextLevel,
				duration: 1500,
				useNativeDriver: false,
			}).start()
	}, [levelStatsResponse, userStatData])

	const [progress] = useState(new Animated.Value(0))

	const handleDone = () => {
		reset()
		navigation.navigate('MainTabs')
	}

	if (
		!levelStatsResponse ||
		!levelStatsData ||
		!userStatData ||
		levelStatsFetching ||
		userStatFetching
	)
		return <LoadingScreen backBtn={false} title='Идёт загрузка результатов' />

	const { experience, experienceToNextLevel, levelUp } = levelStatsResponse
	const { errors, startTime, endTime } = levelStatsData
	const { level } = userStatData

	const errorPercentage = Math.min(1, errors / tasksLength) * 100
	const timeSpent = (endTime! - startTime!) / 1000

	console.log('experience:', experience)
	console.log('experienceToNextLevel:', experienceToNextLevel)
	console.log('levelUp:', levelUp)
	console.log('errors:', errors)
	console.log('level:', level)

	return (
		<View style={styles.root}>
			<Text style={styles.title}>Статистика прохождения уровня</Text>

			<View style={styles.statsContainer}>
				<Text style={styles.statText}>
					Ошибки: {errors} ({errorPercentage.toFixed(0)}%)
				</Text>
				<Text style={styles.statText}>Время: {timeSpent.toFixed(0)} сек</Text>
				<Text style={styles.statText}>заработанный опыт: {experience} XP</Text>
			</View>

			<View style={styles.progressContainer}>
				<Text style={styles.statText}>Опыта до следующего уровня</Text>
				<View style={styles.progressBarBackground}>
					<Animated.View
						style={[
							styles.progressBar,
							{
								width: progress.interpolate({
									inputRange: [0, 1],
									outputRange: ['0%', '100%'],
								}),
							},
						]}
					/>
				</View>
			</View>

			<View
				style={{
					display: levelUp ? 'flex' : 'none',
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

export { LevelStatsScreen }
