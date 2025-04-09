import { useCallback, useEffect } from 'react'
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useUserStatStore } from '../../store/useUserStatStore'
import { useUserProgressStore } from '../../store/useUserProgressStore'
import { useLeaderboardStore } from '../../store/useLeaderBoardStore'

import { COLORS } from '../../constants/theme'
import { LoadingScreen } from '../../widgets/ui'
import { Leaderboard } from './ui'

const StatsScreen = () => {
	const {
		userStatData: UserStatData,
		fetchUserStatData,
		fetching: statFetching,
	} = useUserStatStore()
	const {
		userProgressData,
		fetchUserProgressData,
		fetching: userProgressFetching,
	} = useUserProgressStore()
	const {
		leaderboardData,
		fetchLeaderboardData,
		fetching: leaderboardFetching,
	} = useLeaderboardStore()

	useEffect(() => {
		onRefresh()
	}, [])

	const onRefresh = useCallback(() => {
		if (!statFetching) fetchUserStatData()
		if (!userProgressFetching) fetchUserProgressData()
		if (!leaderboardFetching) fetchLeaderboardData()
	}, [fetchUserStatData, fetchUserProgressData, fetchLeaderboardData])

	const { userProgresses } = userProgressData

	if (!UserStatData || !userProgresses)
		return <LoadingScreen backBtn={false} title='Загрузка статистики...' />

	const { currentExp, experienceToNextLevel, totalExp, level } = UserStatData

	return (
		<ScrollView
			contentContainerStyle={styles.root}
			refreshControl={
				<RefreshControl refreshing={statFetching || userProgressFetching} onRefresh={onRefresh} />
			}>
			<Text style={styles.title}>Моя статистика:</Text>
			<View style={styles.table}>
				<View style={styles.row}>
					<View style={styles.cell}>
						<Text style={styles.pin}>
							Опыта:{' '}
							<Text style={styles.highlight}>
								{currentExp}/{experienceToNextLevel.toFixed(0)}
							</Text>
						</Text>
					</View>
					<View style={styles.cell}>
						<Text style={styles.pin}>
							Всего опыта: <Text style={styles.highlight}>{totalExp}</Text>
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.cell}>
						<Text style={styles.pin}>
							Уровень: <Text style={styles.highlight}>{level}</Text>
						</Text>
					</View>
					<View style={styles.cell}>
						<Text style={styles.pin}>
							Изучаю языков: <Text style={styles.highlight}>{userProgresses.length}</Text>
						</Text>
					</View>
				</View>
			</View>
			<Leaderboard data={leaderboardData} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: 700,
		marginBottom: 16,
	},
	table: { gap: 16, marginBottom: 16 },
	row: {
		flexDirection: 'row',
		gap: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cell: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: COLORS.tomato,
		borderColor: COLORS.tomatoDark,
		padding: 8,
	},
	pin: {
		fontSize: 16,
		fontWeight: 600,
		color: COLORS.white,
		textAlign: 'center',
	},
	highlight: {
		fontWeight: 900,
		color: COLORS.gray,
	},
})

export { StatsScreen }
