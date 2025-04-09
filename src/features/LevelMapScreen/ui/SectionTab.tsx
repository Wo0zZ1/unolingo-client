import { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import vibrate from '../../../utils/vibrate'
import { RootStackParamList } from '../../../navigation/types'

import { PressableButton } from '../../../shared/ui'
import { COLORS } from '../../../constants/theme'

export interface ISectionTabProps {
	height: number
	chapter: number
	sectionId: number
	sectionName: string
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Theory'>

const SectionTab = ({ height, chapter, sectionId, sectionName }: ISectionTabProps) => {
	const navigation = useNavigation<NavigationProp>()

	const theoryPressIn = useCallback(() => {
		vibrate('light')
	}, [])

	const theoryPress = useCallback(() => {
		// TODO Rename to sectionId
		navigation.navigate('Theory', { theoryId: sectionId })
	}, [sectionId])

	return (
		<View style={[styles.fixedHeader, { height: height - 16 * 2 }]}>
			<View style={styles.textBlock}>
				<Text style={styles.sectionTitle}>Глава {chapter}</Text>
				<Text style={styles.sectionDescription}>{sectionName}</Text>
			</View>
			<View>
				<PressableButton
					bgFront={'#ff6347'}
					bgBack={'#cc4f38'}
					borderRadius={8}
					style={styles.theoryButton}
					onPressIn={theoryPressIn}
					onPress={theoryPress}>
					<Text style={styles.theoryButtonText}>Теория</Text>
				</PressableButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	fixedHeader: {
		position: 'absolute',
		width: '90%',
		top: 16,
		left: '50%',
		transform: [{ translateX: '-50%' }],
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 16,
		zIndex: 1,
		backgroundColor: 'white',
		boxShadow: [
			{
				color: '#3332',
				offsetX: 4,
				offsetY: 4,
				blurRadius: 16,
			},
		],
	},
	textBlock: {
		height: '100%',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'tomato',
	},
	sectionDescription: {
		marginTop: 'auto',
		color: COLORS.text,
		fontSize: 18,
		fontWeight: '700',
	},
	theoryButton: {
		padding: 10,
		backgroundColor: 'tomato',
	},
	theoryButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
})

export default SectionTab
