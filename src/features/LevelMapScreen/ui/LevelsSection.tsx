import { StyleSheet, View } from 'react-native'

import LevelCircle from './LevelCircle'
import SectionDivider from './SectionDivider'

import { useDimensions } from '../../../hoocs'

import { IMapSection } from '../../../store/useMapStore'

export interface ILevelsSectionsProps {
	sectionData: IMapSection
	height: number
}

const LevelsSection = ({ sectionData, height }: ILevelsSectionsProps) => {
	const { width } = useDimensions()

	const calcLeft = (index: number) => {
		if (index % 2 == 0) return 'mid'
		if (index % 4 == 1) return 'right'
		return 'left'
	}

	return (
		<View style={[styles.section, { height, width: width * 0.7 }]}>
			<SectionDivider width={width * 0.8} sectionName={`Глава ${sectionData.section}`} />
			{sectionData.levelsData.map((level, i) => (
				<LevelCircle position={calcLeft(i)} key={level.id} level={level} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		marginHorizontal: 'auto',
	},
})

export default LevelsSection
