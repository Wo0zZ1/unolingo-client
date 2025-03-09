import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

import { RootStackParamList } from '../../../navigation/types'
import { memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface IQuitButtonProps {
	style?: StyleProp<ViewStyle>
}

const QuitButton = memo(({ style }: IQuitButtonProps) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

	return (
		<TouchableOpacity style={[style, styles.closeButton]} onPress={() => navigation.goBack()}>
			<Text style={styles.closeButtonText}>×</Text>
		</TouchableOpacity>
	)
})

const styles = StyleSheet.create({
	closeButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeButtonText: {
		fontSize: 50,
		lineHeight: 50,
		color: 'tomato',
	},
})

export default QuitButton
