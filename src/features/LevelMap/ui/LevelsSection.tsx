import { StyleSheet, View } from 'react-native'

import { ILevel } from '../model/levels'

import LevelCircle from './LevelCircle'
import { SectionDivider } from './SectionDivider'
import useWindow from '../../../hoocs/useWidth'

export interface ILevelsSectionsProps {
	levels: ILevel[]
	height: number
}

const LevelsSection = ({ levels, height }: ILevelsSectionsProps) => {
	const { width } = useWindow()

	const calcLeft = (index: number) => {
		if (index % 2 == 0) return 'mid'
		if (index % 4 == 1) return 'right'
		return 'left'
	}

	return (
		<View style={[styles.section, { height, width: width * 0.7 }]}>
			<SectionDivider
				width={width * 0.8}
				sectionName={`Глава ${levels[0].section}`}
			/>
			{levels.map((level, i) => (
				<LevelCircle
					position={calcLeft(i)}
					key={level.id}
					level={level}
				/>
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
