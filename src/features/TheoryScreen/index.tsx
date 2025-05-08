import { useCallback, useEffect } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'

import { Empty, Separator, TheoryBlock } from './ui'

import type { RootStackParamList } from '../../navigation/types'

import { ITheoryParagraph, useTheoryStore } from '../../store/useTheoryStore'

import { Header, LoadingScreen } from '../../widgets/ui'

const TheoryScreen = () => {
	const route = useRoute<RouteProp<RootStackParamList, 'Theory'>>()
	const { theoryId } = route.params

	const { theoryData, fetchTheory, fetching: theoryFetching } = useTheoryStore()

	const renderTheoryBlock = useCallback(
		({ item }: ListRenderItemInfo<ITheoryParagraph>) => <TheoryBlock {...item} />,
		[],
	)

	useEffect(() => {
		if (!theoryFetching) fetchTheory(theoryId)
	}, [theoryId])

	if (!theoryData) return <LoadingScreen title={'Загрузка теории...'} />

	return (
		<View style={{ flex: 1 }}>
			<Header underline={true} title={theoryData.title} />
			<FlatList
				contentContainerStyle={styles.container}
				keyExtractor={({ title }) => title}
				data={theoryData.paragraphs}
				ListEmptyComponent={Empty}
				renderItem={renderTheoryBlock}
				ItemSeparatorComponent={Separator}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	text: {
		fontSize: 18,
		lineHeight: 24,
		marginBottom: 6,
	},
})

export { TheoryScreen }
