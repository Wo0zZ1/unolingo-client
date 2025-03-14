import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { PressableButton } from '../../../shared/ui'
import vibrate from '../../../utils/vibrate'

interface ICheckButtonProps {
	disabled?: boolean
	onPress: () => void
}

const CheckButton = ({ disabled = false, onPress }: ICheckButtonProps) => {
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
				bgBack={'#cc4f38'}
				disabled={disabled}>
				<Text style={styles.title}>Проверить</Text>
			</PressableButton>
		</View>
	)
}
const styles = StyleSheet.create({
	root: {
		maxWidth: 220,
		width: '100%',
		marginHorizontal: 'auto',
		marginTop: 30,
	},
	button: {
		paddingVertical: 16,
		paddingHorizontal: 32,
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'white',
		fontSize: 18,
	},
})

export default CheckButton
