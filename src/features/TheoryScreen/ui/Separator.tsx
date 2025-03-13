import { StyleSheet, View } from 'react-native'

const Separator = () => {
	return <View style={styles.separator} />
}

const styles = StyleSheet.create({
	separator: {
		height: 2,
		width: StyleSheet.absoluteFill,
		backgroundColor: '#F2F2F2',
		marginVertical: 20,
		marginHorizontal: -20,
	},
})

export { Separator }
