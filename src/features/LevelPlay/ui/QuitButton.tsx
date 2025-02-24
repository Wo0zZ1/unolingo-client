import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../../../app/navigation/types'

const QuitButton = () => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList>>()

	return (
		<TouchableOpacity
			style={styles.closeButton}
			onPress={() => navigation.goBack()}>
			<Text style={styles.closeButtonText}>×</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	closeButton: {
		position: 'absolute',
		top: 40,
		left: 20,
		zIndex: 1,
	},
	closeButtonText: {
		fontSize: 45,
		color: 'tomato',
	},
})

export default QuitButton
