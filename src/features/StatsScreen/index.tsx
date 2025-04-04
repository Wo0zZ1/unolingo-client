import { useCallback, useEffect } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useProfileStore } from '../../store/useProfileStore'

import { LoadingScreen } from '../../widgets/ui'

const StatsScreen = () => {
	const { profileData, fetching, fetchProfileData } = useProfileStore()

	const onRefresh = useCallback(() => {
		fetchProfileData()
	}, [fetchProfileData])

	if (!profileData) return <LoadingScreen backBtn={false} title='Загрузка статистики...' />

	const { courses, experienceToNextLevel, experienceTotal, level } = profileData

	return (
		<ScrollView
			contentContainerStyle={styles.root}
			refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefresh} />}>
			<Text>Моя статистика:</Text>
			<View>
				<View>
					<Text>Всего опыта: {experienceTotal}</Text>
				</View>
				<View>
					<Text>Опыта до следующего уровня: {experienceToNextLevel}</Text>
				</View>
				<View>
					<Text>Лвл: {level}</Text>
				</View>
				<View>
					<Text>Изучаю языков: {courses.length}</Text>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
	},
})

export { StatsScreen }
