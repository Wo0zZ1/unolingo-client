import { useCallback, useEffect } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'

import { Empty, Separator, TheoryBlock } from './ui'

import type { RootStackParamList } from '../../navigation/types'

import { ITheoryBlock, useTheoryStore } from '../../store/useTheoryStore'

import { Header, LoadingScreen } from '../../widgets/ui'

const TheoryScreen = () => {
	const route = useRoute<RouteProp<RootStackParamList, 'Theory'>>()
	const { theoryId } = route.params

	const { theoryData, fetching, fetchTheory } = useTheoryStore()

	const renderTheoryBlock = useCallback(
		({ item }: ListRenderItemInfo<ITheoryBlock>) => <TheoryBlock {...item} />,
		[],
	)

	useEffect(() => {
		fetchTheory(theoryId)
	}, [theoryId])

	if (fetching) return <LoadingScreen title={'Загрузка теории...'} />

	return (
		<>
			<Header underline={true} title={theoryData.name} />
			<FlatList
				contentContainerStyle={styles.container}
				keyExtractor={({ title }) => title}
				data={theoryData.theoryBlocks}
				ListEmptyComponent={Empty}
				renderItem={renderTheoryBlock}
				ItemSeparatorComponent={Separator}
			/>
		</>
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
