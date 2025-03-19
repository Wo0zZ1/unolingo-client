import * as Haptics from 'expo-haptics'
import { NativeScrollEvent, ScrollView, StyleSheet, View } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'

import SectionTab from './ui/SectionTab'
import LevelsSection from './ui/LevelsSection'
import PathLine from './ui/PathLine'

import { LoadingScreen } from '../../widgets/ui'

import { COLORS } from '../../constants/theme'

import { useDimensions } from '../../hoocs'
import { useMapStore } from '../../store/useMapStore'
import { useProfileStore } from '../../store/useProfileStore'

const SECTION_HEIGHT = 700

const LevelMapScreen = () => {
	const { height } = useDimensions()

	const currentCourseId = useProfileStore(state => state.profileData?.activeCourseId)
	const { mapData, fetching, fetchMap } = useMapStore()

	const [currentSection, setCurrentSection] = useState<number>(1)
	const scrollViewRef = useRef<ScrollView>(null)
	// TODO Сделать прокрут страницы к последнему непройденному уровню

	const handleScroll = useCallback(
		(event: { nativeEvent: NativeScrollEvent }) => {
			if (fetching) return
			const scrollY = event.nativeEvent.contentOffset.y
			const newSection = Math.min(
				Math.max(1, Math.floor((scrollY + height / 6) / (SECTION_HEIGHT + 20) + 1)),
				mapData.mapSections.length,
			)
			setCurrentSection(prev => {
				if (prev !== newSection) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
				return newSection
			})
		},
		[mapData, height],
	)

	useEffect(() => {
		if (typeof currentCourseId === 'undefined') return
		fetchMap(currentCourseId)
	}, [currentCourseId])

	if (fetching) return <LoadingScreen backBtn={false} title={'Загрузка карты...'} />

	return (
		<View style={styles.container}>
			<SectionTab currentSection={currentSection} />
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={styles.scrollContainer}
				onScroll={handleScroll}
				scrollEventThrottle={16}>
				<PathLine sectionHeight={SECTION_HEIGHT} sectionsCount={mapData.mapSections.length} />
				{mapData.mapSections.map((section, index) => (
					<LevelsSection key={index} sectionData={section} height={SECTION_HEIGHT} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		backgroundColor: COLORS.gray,
	},

	scrollContainer: {
		marginTop: 96, // Отступ для фиксированной плашки
	},
})

export { LevelMapScreen }
