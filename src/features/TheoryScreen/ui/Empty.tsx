import { StyleSheet, Text } from 'react-native'

const Empty = () => {
	return <Text style={styles.empty}>На данный момент теория не загружена...</Text>
}
const styles = StyleSheet.create({
	empty: {
		padding: 20,
		textAlign: 'center',
	},
})

export { Empty }
