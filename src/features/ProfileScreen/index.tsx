import { useCallback, useEffect, useState } from 'react'
import { SvgXml } from 'react-native-svg'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import {
	FlatList,
	ListRenderItemInfo,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import { parseDate } from '../../utils/intl'

import { LoadingScreen } from '../../widgets/ui'

import { Empty, Separator, LanguageBlock, NewLanguageBlock } from './ui'
import { $api, useAuth } from '../../navigation/AuthContext'
import { PressableButton } from '../../shared/ui'
import { COLORS } from '../../constants/theme'
import { useUserProgressStore } from '../../store/useUserProgressStore'
import { LanguageCode, useUserStore } from '../../store/useUserStore'

// TODO Вынести

export type ILanguage = {
	id: number
	name: string
	sourceLang: LanguageCode
	targetLang: LanguageCode
	flagIcon: string
	createdAt: Date
	updatedAt: Date
}

const ProfileScreen = () => {
	const {
		userProgressData,
		setSelectedLanguageId,
		subscribeUserToLanuage,
		fetchUserProgressData,
		fetching: userProgressFetching,
	} = useUserProgressStore()
	const { userData, fetchUserData, fetching: userDataFetching } = useUserStore()

	const { onLogout } = useAuth()

	const [languages, setLanguages] = useState<ILanguage[] | null>(null)

	const fetchLanguages = async () => {
		const { data } = await $api.get<ILanguage[]>('api/languages')
		setLanguages(data)
	}

	useEffect(() => {
		onRefresh()
	}, [])

	const onRefresh = useCallback(() => {
		if (!languages) fetchLanguages()
		if (!userDataFetching) fetchUserData()
		if (!userProgressFetching) fetchUserProgressData()
	}, [fetchLanguages, fetchUserData, fetchUserProgressData])

	const { userProgresses, lastSelectedLanguageId } = userProgressData

	if (!languages || !userData || !userProgresses)
		return <LoadingScreen backBtn={false} title='Загрузка профиля...' />

	const { username, createdAt } = userData

	const avatar = createAvatar(avataaars, {
		seed: username,
		backgroundColor: ['d6e3fd'],
		radius: 50,
	}).toString()

	const renderLanguageBlock = ({ item }: ListRenderItemInfo<ILanguage>) => (
		<LanguageBlock
			courseData={item}
			active={item.id === lastSelectedLanguageId}
			onPress={setSelectedLanguageId}
		/>
	)

	const renderNewLanguageBlock = ({ item }: ListRenderItemInfo<ILanguage>) => (
		<NewLanguageBlock courseData={item} onPress={subscribeUserToLanuage} />
	)

	return (
		<ScrollView
			contentContainerStyle={styles.root}
			refreshControl={
				<RefreshControl
					refreshing={userDataFetching || userProgressFetching}
					onRefresh={onRefresh}
				/>
			}>
			<View style={[styles.block, styles.row]}>
				<SvgXml style={styles.profileLogo} xml={avatar} />
				<Text style={styles.profileName}>{username}</Text>
			</View>
			<View style={[styles.block, styles.row]}>
				<Text>{`Дата регистрации: ${parseDate(createdAt)}`}</Text>
			</View>
			<View style={[styles.block]}>
				<Text style={styles.paragraph}>Мои курсы:</Text>
				<FlatList
					data={languages.filter(language =>
						userProgresses.some(userProgress => userProgress.languageId === language.id),
					)}
					horizontal
					contentContainerStyle={styles.coursesContainer}
					keyExtractor={({ id }) => id.toString()}
					ListEmptyComponent={Empty}
					renderItem={renderLanguageBlock}
					ItemSeparatorComponent={Separator}
				/>
			</View>
			<View style={[styles.block]}>
				<Text style={styles.paragraph}>Записаться на курсы:</Text>
				<FlatList
					data={languages.filter(
						language =>
							language.sourceLang === userData.language &&
							!userProgresses.some(userProgress => userProgress.languageId === language.id),
					)}
					horizontal
					contentContainerStyle={styles.coursesContainer}
					keyExtractor={({ id }) => id.toString()}
					ListEmptyComponent={Empty}
					renderItem={renderNewLanguageBlock}
					ItemSeparatorComponent={Separator}
				/>
			</View>
			<View style={styles.footer}></View>
			<View
				style={[
					styles.block,
					styles.row,
					{
						marginTop: 48,
						alignSelf: 'center',
					},
				]}>
				<PressableButton
					style={styles.quitButton}
					withVibrate
					onPress={onLogout}
					bgBack={COLORS.tomatoDark}
					bgFront={COLORS.tomato}>
					<Text style={styles.quitText}>Выйти из аккаунта</Text>
				</PressableButton>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	root: {
		minHeight: '100%',
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
	footer: {
		marginTop: 'auto',
	},
	quitButton: {
		padding: 12,
	},
	quitText: {
		textTransform: 'uppercase',
		textAlign: 'center',
		color: COLORS.white,
		fontSize: 18,
		fontWeight: 700,
	},
})

export { ProfileScreen }
