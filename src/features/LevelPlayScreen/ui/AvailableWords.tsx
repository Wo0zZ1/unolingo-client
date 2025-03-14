import { StyleSheet, Text, View } from 'react-native'
import { IWord } from './WordPicker'
import DraggableWord from './DraggableWord'
import { memo } from 'react'

interface IAvailableWordsProps {
	words: IWord[]
	selectHandler: (wordId: number) => void
}

const AvailableWords = memo(({ words, selectHandler }: IAvailableWordsProps) => {
	return (
		<View style={styles.wordsContainer}>
			{words.map(word => (
				<View style={styles.back} key={word.id}>
					{!word.selected && <DraggableWord word={word} onSelect={selectHandler} />}
				</View>
			))}
		</View>
	)
})

const styles = StyleSheet.create({
	wordsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 5,
	},
	back: {
		backgroundColor: '#F2F2F2',
	},
})

export default AvailableWords
