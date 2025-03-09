import { StyleSheet, Text, View } from 'react-native'
import PressableButton from '../../../shared/ui/buttons/PressableButton'
import vibrate from '../../../utils/vibrate'
import { useCallback } from 'react'

interface IPressableButtonProps {
	onPress: () => void
}

const ContinueButton = ({ onPress }: IPressableButtonProps) => {
	const onPressIn = useCallback(() => {
		vibrate('medium')
	}, [])

	return (
		<View style={styles.root}>
			<PressableButton
				style={styles.button}
				onPress={onPress}
				onPressIn={onPressIn}
				bgFront={'tomato'}
				bgBack={'#cc4f38'}>
				<Text style={styles.title}>Продолжить</Text>
			</PressableButton>
		</View>
	)
}
const styles = StyleSheet.create({
	root: {
		marginTop: 15,
	},
	button: {
		paddingVertical: 15,
		paddingHorizontal: 45,
	},
	title: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 18,
	},
})

export default ContinueButton
