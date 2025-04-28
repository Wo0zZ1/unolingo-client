import * as Haptics from 'expo-haptics'
import { NativeScrollEvent, ScrollView, StyleSheet, View } from 'react-native'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import SectionTab from './ui/SectionTab'
import LevelsSection from './ui/LevelsSection'
import PathLine from './ui/PathLine'

import { LoadingScreen } from '../../widgets/ui'

import { COLORS, SIZES } from '../../constants/theme'

import { useDimensions } from '../../hoocs'
import { useMapStore } from '../../store/useMapStore'
import { useUserProgressStore } from '../../store/useUserProgressStore'

const SECTION_HEIGHT = 700

const LevelMapScreen = memo(() => {
	// TODO Сделать прокрут страницы к последнему непройденному уровню
	const scrollViewRef = useRef<ScrollView>(null)
	const { height } = useDimensions()

	const {
		userProgressData,
		fetchUserProgressData,
		fetching: userProgressFetching,
	} = useUserProgressStore()
	const { mapData, fetching: mapDataFetching, fetchMapData } = useMapStore()

	const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0)

	useEffect(() => {
		fetchUserProgressData()
		fetchMapData(userProgressData.lastSelectedLanguageId)
	}, [])

	useEffect(() => {
		setCurrentSectionIndex(0)
		fetchMapData(userProgressData.lastSelectedLanguageId)
	}, [userProgressData.lastSelectedLanguageId, setCurrentSectionIndex])

	const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
		if (userProgressFetching || mapDataFetching) return
		const scrollY = event.nativeEvent.contentOffset.y
		const newSection = Math.min(
			Math.max(0, Math.floor((scrollY + height / 6) / (SECTION_HEIGHT + 20))),
			sections.length,
		)
		setCurrentSectionIndex(prev => {
			if (prev !== newSection) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			return newSection
		})
	}

	const { userProgresses, lastSelectedLanguageId } = userProgressData

	if (!lastSelectedLanguageId) return <LoadingScreen backBtn={false} title='Выберите курс' />

	if (!userProgresses || !mapData)
		return <LoadingScreen backBtn={false} title='Загрузка карты...' />

	const { sections } = mapData

	const currentUserProgress = userProgresses.find(
		progress => progress.languageId === lastSelectedLanguageId,
	)

	const currentSection = sections.find(section => section.order === currentSectionIndex + 1)

	if (!currentUserProgress || !currentSection)
		return <LoadingScreen backBtn={false} title='Произошла ошибка' />

	return (
		<View style={styles.container}>
			<SectionTab
				height={SIZES.SectionTabHeight}
				chapter={currentSection.order}
				sectionId={currentSection.id}
				sectionName={currentSection.name}
			/>
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={{ marginTop: SIZES.SectionTabHeight }}
				onScroll={handleScroll}
				scrollEventThrottle={16}>
				<PathLine sectionHeight={SECTION_HEIGHT} sectionsCount={sections.length} />
				{sections.map(section => (
					<LevelsSection
						key={section.id}
						id={section.id}
						lastUnlockedLevel={currentUserProgress.lastUnlockedLevel}
						order={section.order}
						height={SECTION_HEIGHT}
					/>
				))}
			</ScrollView>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		backgroundColor: COLORS.gray,
	},
})

export { LevelMapScreen }
