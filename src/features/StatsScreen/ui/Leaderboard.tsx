import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { ILeaderboardData } from '../../../store/useLeaderBoardStore'
import { COLORS } from '../../../constants/theme'
import { useEffect } from 'react'

interface ILeaderboardProps {
	data: ILeaderboardData[] | null
}

const Leaderboard = ({ data }: ILeaderboardProps) => {
	if (!data) return <Text>Идёт загрузка лидеров</Text>

	return (
		<>
			<Text style={styles.title}>Таблица лидеров</Text>
			<View style={styles.table}>
				<ScrollView style={{ borderRadius: 8 }}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View>
							<View style={styles.row}>
								<View style={[styles.cell, { width: 100 }]}>
									<Text style={styles.cellText}>Никнейм</Text>
								</View>
								<View style={[styles.cell, { width: 70 }]}>
									<Text style={styles.cellText}>Опыт</Text>
								</View>
								<View style={[styles.cell, { width: 90 }]}>
									<Text style={styles.cellText}>Уровень</Text>
								</View>
								<View style={[styles.cell, { width: 100 }]}>
									<Text style={styles.cellText}>Ударный режим</Text>
								</View>
								<View style={[styles.cell, { width: 140 }]}>
									<Text style={styles.cellText}>Последняя активность</Text>
								</View>
							</View>
							{data.map((leaderboardData, i) => {
								return (
									<View key={leaderboardData.username}>
										<View
											style={[styles.row, i + 1 === data.length ? { borderBottomWidth: 0 } : {}]}>
											<View style={[styles.cell, { width: 100 }]}>
												<Text style={styles.cellText}>{leaderboardData.username}</Text>
											</View>
											<View style={[styles.cell, { width: 70 }]}>
												<Text style={styles.cellText}>{leaderboardData.totalExp}</Text>
											</View>
											<View style={[styles.cell, { width: 90 }]}>
												<Text style={styles.cellText}>{leaderboardData.level}</Text>
											</View>
											<View style={[styles.cell, { width: 100 }]}>
												<Text style={styles.cellText}>{leaderboardData.streakDays}</Text>
											</View>
											<View style={[styles.cell, { width: 140 }]}>
												<Text style={styles.cellText}>
													{leaderboardData.lastActive.toLocaleString('ru-RU', {
														day: 'numeric',
														month: 'long',
													})}
												</Text>
											</View>
										</View>
									</View>
								)
							})}
						</View>
					</ScrollView>
				</ScrollView>
			</View>
		</>
	)
}
const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: 600,
		marginBottom: 8,
	},
	table: {
		backgroundColor: COLORS.tomato,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: COLORS.tomatoDark,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 2,
		backgroundColor: COLORS.tomato,
		borderColor: COLORS.tomatoDark,
	},
	cell: {
		// flex: 1,
		padding: 8,
	},
	cellText: {
		fontSize: 16,
		fontWeight: 600,
		color: COLORS.white,
		textAlign: 'center',
	},
})

export { Leaderboard }
