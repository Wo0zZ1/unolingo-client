import { SvgXml } from 'react-native-svg'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import { useCallback, useEffect } from 'react'
import {
	Button,
	FlatList,
	ListRenderItemInfo,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import { parseDate } from '../../utils/intl'

import { ICourseData, useProfileStore } from '../../store/useProfileStore'

import { LoadingScreen } from '../../widgets/ui'

import { Empty, Separator, CourseBlock } from './ui'
import { $api, useAuth } from '../../navigation/AuthContext'

const ProfileScreen = () => {
	const { profileData, setActiveCourseId, fetching, fetchProfileData } = useProfileStore()

	const { onLogout } = useAuth()

	const onRefresh = useCallback(() => {
		fetchProfileData()
	}, [fetchProfileData])

	useEffect(() => {
		fetchProfileData()
	}, [])

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await $api.get('users')
		}
		fetchUsers()
	})

	if (!profileData) return <LoadingScreen backBtn={false} title='Загрузка профиля...' />

	const { userName, email, createdAt, courses, activeCourseId } = profileData

	const avatar = createAvatar(avataaars, {
		seed: email,
		backgroundColor: ['d6e3fd'],
		radius: 50,
	}).toString()

	const renderTheoryBlock = ({ item }: ListRenderItemInfo<ICourseData>) => (
		<CourseBlock
			courseData={item}
			active={item.mapId === activeCourseId}
			onPress={setActiveCourseId}
		/>
	)

	return (
		<ScrollView
			contentContainerStyle={styles.root}
			refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefresh} />}>
			<View style={[styles.block, styles.row]}>
				<SvgXml style={styles.profileLogo} xml={avatar} />
				<Text style={styles.profileName}>{userName}</Text>
			</View>
			<View style={[styles.block, styles.row]}>
				<Text>{`@${email}`}</Text>
				<Text style={{ fontWeight: '900' }}>·</Text>
				<Text>{`Регистрация: ${parseDate(createdAt)}`}</Text>
			</View>
			<View style={[styles.block]}>
				<Text style={styles.paragraph}>Мои курсы:</Text>
				<FlatList
					data={courses}
					horizontal
					contentContainerStyle={styles.coursesContainer}
					keyExtractor={({ mapId: id }) => id.toString()}
					ListEmptyComponent={Empty}
					renderItem={renderTheoryBlock}
					ItemSeparatorComponent={Separator}
				/>
			</View>
			<View style={[styles.block]}>
				<Button onPress={onLogout} title='Выйти из аккаунта' />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
	},
	profileLogo: {
		width: 80,
		height: 80,
	},
	profileName: {
		fontSize: 24,
		fontWeight: '700',
	},
	block: {
		marginBottom: 16,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	paragraph: {
		marginVertical: 16,
		fontSize: 24,
		fontWeight: '600',
	},
	coursesContainer: {},
})

export { ProfileScreen }
