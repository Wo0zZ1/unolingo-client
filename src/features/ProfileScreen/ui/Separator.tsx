import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../../constants/theme'

const Separator = () => {
	return <View style={styles.separator} />
}

const styles = StyleSheet.create({
	separator: {
		height: StyleSheet.absoluteFill,
		width: 1.5,
		borderRadius: 10,
		backgroundColor: COLORS.grayLight,
		marginHorizontal: 16,
	},
})

export { Separator }
