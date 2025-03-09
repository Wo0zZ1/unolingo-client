import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { RouteProp } from '@react-navigation/native'

import { useTheoryStore } from '../../store/useTheoryStore'
import { RootStackParamList } from '../../app/navigation/types'
import { Header } from '../../widgets/ui'
import LoadingScreen from '../LoadingScreen'

interface ITheoryScreenProps {
	route: RouteProp<RootStackParamList, 'Theory'>
}

const TheoryScreen = ({ route }: ITheoryScreenProps) => {
	const { theoryId } = route.params

	const { theory, fetching, fetchTheory } = useTheoryStore()

	useEffect(() => {
		fetchTheory(theoryId)
	}, [])

	if (fetching) return <LoadingScreen title={'Загрузка теории...'} />

	return (
		<>
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.title}>{theory?.title}</Text>
				{theory.paragraphs.map((paragraph, index) => (
					<Text key={index} style={styles.paragraph}>
						{paragraph}
					</Text>
				))}
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 10,
	},
	paragraph: {},
})

export default TheoryScreen
