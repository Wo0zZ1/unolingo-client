import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ITheoryBlock } from '../../../store/useTheoryStore'

const TheoryBlock = memo(({ title, paragraphs }: ITheoryBlock) => {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			{paragraphs.map((paragraph, index) => (
				<Text key={index} style={styles.text}>
					{'\t'}
					{paragraph}
				</Text>
			))}
		</View>
	)
})

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	text: {
		fontSize: 18,
		marginBottom: 6,
	},
})

export { TheoryBlock }
