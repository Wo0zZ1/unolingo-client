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
import { useProfileStore } from '../../store/useProfileStore'

const SECTION_HEIGHT = 700

const LevelMapScreen = memo(() => {
	// TODO Сделать прокрут страницы к последнему непройденному уровню
	const scrollViewRef = useRef<ScrollView>(null)

	const { height } = useDimensions()

	const currentCourseId = useProfileStore(state => state.profileData?.activeCourseId)
	const { mapData, fetching, fetchMap } = useMapStore()

	const [currentSection, setCurrentSection] = useState<number>(0)

	useEffect(() => {
		if (typeof currentCourseId === 'undefined') return
		setCurrentSection(0)
		fetchMap(currentCourseId)
	}, [currentCourseId])

	const handleScroll = useCallback(
		(event: { nativeEvent: NativeScrollEvent }) => {
			if (fetching) return
			const scrollY = event.nativeEvent.contentOffset.y
			const newSection = Math.min(
				Math.max(0, Math.floor((scrollY + height / 6) / (SECTION_HEIGHT + 20))),
				mapData.mapSections.length,
			)
			setCurrentSection(prev => {
				if (prev !== newSection) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
				return newSection
			})
		},
		[mapData, height],
	)

	if (fetching || typeof currentCourseId === 'undefined')
		return <LoadingScreen backBtn={false} title={'Загрузка карты...'} />

	return (
		<View style={styles.container}>
			<SectionTab
				height={SIZES.SectionTabHeight}
				section={mapData.mapSections[currentSection].section}
				partialTheoryData={mapData.mapSections[currentSection].partialTheoryData}
			/>
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={{ marginTop: SIZES.SectionTabHeight }}
				onScroll={handleScroll}
				scrollEventThrottle={16}>
				<PathLine sectionHeight={SECTION_HEIGHT} sectionsCount={mapData.mapSections.length} />
				{mapData.mapSections.map((section, index) => (
					<LevelsSection key={index} sectionData={section} height={SECTION_HEIGHT} />
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
