import * as Haptics from 'expo-haptics'
import { NativeScrollEvent, ScrollView, StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'

import { ILevel, mockLevels } from './model/levels'

import { groupLevels } from './lib/groupLevels'

import SectionTab from './ui/SectionTab'
import LevelsSection from './ui/LevelsSection'
import PathLine from './ui/PathLine'
import { useDimensions } from '../../hoocs'

const SECTION_HEIGHT = 700

const LevelMapScreen = () => {
	const { height } = useDimensions()

	const [currentSection, setCurrentSection] = useState<number>(1)
	const scrollViewRef = useRef<ScrollView>(null)
	// TODO Сделать прокрут страницы к последнему непройденному уровню

	const handleScroll = (event: { nativeEvent: NativeScrollEvent }) => {
		const scrollY = event.nativeEvent.contentOffset.y
		const newSection = Math.min(
			Math.max(1, Math.floor((scrollY + height / 6) / (SECTION_HEIGHT + 20) + 1)),
			sections.length,
		)
		setCurrentSection(prev => {
			if (prev !== newSection) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			return newSection
		})
	}

	const [sections, setSections] = useState<ILevel[][]>([])

	const fetchLevels = () => {
		// const data = fetch()
		const data = mockLevels

		const groupedLevels = groupLevels(data)
		setSections(groupedLevels)
	}

	useEffect(() => {
		fetchLevels()
	}, [])

	return (
		<View style={styles.container}>
			<SectionTab currentSection={currentSection} />
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={styles.scrollContainer}
				onScroll={handleScroll}
				scrollEventThrottle={16}>
				<PathLine sectionHeight={SECTION_HEIGHT} sectionsCount={sections.length} />
				{sections.map((levels, index) => (
					<LevelsSection key={index} levels={levels} height={SECTION_HEIGHT} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},

	scrollContainer: {
		marginTop: 96, // Отступ для фиксированной плашки
	},
})

export { LevelMapScreen }
