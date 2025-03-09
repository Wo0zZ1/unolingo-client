import {
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../../../app/navigation/types'

interface IQuitButtonProps {
	style?: StyleProp<ViewStyle>
}

const QuitButton = ({ style }: IQuitButtonProps) => {
	const navigation =
		useNavigation<StackNavigationProp<RootStackParamList>>()

	return (
		<TouchableOpacity
			style={[style]}
			onPress={() => navigation.goBack()}>
			<Text style={styles.closeButtonText}>×</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	closeButtonText: {
		fontSize: 48,
		lineHeight: 48,
		color: 'tomato',
	},
})

export default QuitButton
