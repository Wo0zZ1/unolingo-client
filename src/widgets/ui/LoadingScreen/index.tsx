import { StyleSheet, Text, View } from 'react-native'

import { Header } from '../Header'

interface ILoadingScreenProps {
	title: string
	backBtn?: boolean
}

const LoadingScreen = ({ title, backBtn = true }: ILoadingScreenProps) => {
	return (
		<>
			<Header backBtn={backBtn} underline={false} />
			<View style={styles.container}>
				<Text style={{ fontSize: 30 }}>{title}</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		zIndex: 10,
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		height: 40,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
	close: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
	},
})

export { LoadingScreen }
