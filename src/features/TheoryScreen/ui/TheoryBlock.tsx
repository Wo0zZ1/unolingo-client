import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ITheoryParagraph } from '../../../store/useTheoryStore'

const TheoryBlock = memo(({ title, items }: ITheoryParagraph) => {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			{items.map((item, index) => (
				<Text key={index} style={styles.text}>
					{'\t'}
					{item}
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
