import { memo } from 'react'
import { StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { generatePath } from '../lib/generatePath'

import { useDimensions } from '../../../hooks'

interface IPathLineProps {
	sectionsCount: number
	sectionHeight: number
}

const PathLine = memo(({ sectionHeight, sectionsCount }: IPathLineProps) => {
	const { width } = useDimensions()

	return (
		<Svg height='100%' width='100%' style={styles.path}>
			<Path
				d={generatePath(sectionHeight, sectionsCount, width)}
				fill='none'
				stroke='tomato'
				strokeWidth={4}
			/>
		</Svg>
	)
})

const styles = StyleSheet.create({
	path: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
})

export default PathLine
