import { StyleSheet, Text, View } from 'react-native'

const StatsScreen = () => (
	<View style={styles.centeredContainer}>
		<Text>Stats Screen</Text>
	</View>
)

const styles = StyleSheet.create({
	centeredContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export { StatsScreen }
