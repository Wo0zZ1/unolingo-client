import * as Haptics from 'expo-haptics'
import { StyleSheet, Text, View } from 'react-native'
import type { ILevel } from '../model/levels'

import PressableButton from '../../../shared/ui/buttons/PressableButton'
import vibrate from '../../../utils/vibrate'

export interface ISectionTabProps {
	currentSection: ILevel['section']
}

const SectionTab = ({ currentSection }: ISectionTabProps) => {
	const theoryPressIn = () => {
		vibrate('light')
	}

	const theoryPress = (section: number) => {
		console.log(`Нажатие теории для секции: ${section}`)
		// Здесь будет логика перехода к теории
	}

	return (
		<View style={styles.fixedHeader}>
			<Text style={styles.sectionTitle}>Глава {currentSection}</Text>
			<PressableButton
				bgFront={'#ff6347'}
				bgBack={'#cc4f38'}
				borderRadius={8}
				style={styles.theoryButton}
				onPressIn={theoryPressIn}
				onPress={() => theoryPress(currentSection)}>
				<Text style={styles.theoryButtonText}>Теория</Text>
			</PressableButton>
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
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'tomato',
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginBottom: 10,
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
