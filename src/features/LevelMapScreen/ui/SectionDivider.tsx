import React from 'react'
import Svg, { Line } from 'react-native-svg'
import { View, StyleSheet, Text } from 'react-native'

interface ISectionDividerProps {
	width: number
	sectionName: string
}

export const SectionDivider = ({
	width,
	sectionName,
}: ISectionDividerProps) => (
	<View style={styles.container}>
		<Svg style={styles.svg} height='2' width={width}>
			<Line
				x1='0'
				y1='1'
				x2={width}
				y2='1'
				stroke='gray'
				strokeWidth='2'
			/>
		</Svg>
		<View style={styles.sectionNameContainer}>
			<Text style={styles.sectionName}>{sectionName}</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		alignItems: 'center',
		marginTop: 20,
	},
	svg: {
		position: 'absolute',
		top: 10,
	},
	sectionNameContainer: {
		backgroundColor: '#f2f2f2',
		paddingHorizontal: 4,
	},
	sectionName: {
		fontSize: 16,
		fontWeight: '900',
		color: 'gray',
	},
})
